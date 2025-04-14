import Stripe from 'stripe'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { PackageCreateType } from '@/types/package'
import { InvoiceCreateType } from '@/types/invoice'
import { NextRequest, NextResponse } from 'next/server'
import { DirectAdminCreateType } from '@/types/directadmin'
import { SubscriptionCreateType } from '@/types/subscription'
import { createDirectAdminUser, deleteDirectAdminUser } from '@/lib/services/directadmin'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: NextRequest) {
    const cookieStore = await cookies()
    const supabase = createServerClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!, {
        cookies: {
            getAll() {
                return cookieStore.getAll()
            },
            setAll(cookiesToSet) {
                try {
                    cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
                } catch {
                    // The `setAll` method was called from a Server Component.
                    // This can be ignored if you have middleware refreshing
                    // user sessions.
                }
            },
        },
    })

    const reqText = await req.text()
    return webhooksHandler(reqText, req, supabase)
}

async function getCustomerEmail(customerId: string): Promise<string | null> {
    try {
        const customer = await stripe.customers.retrieve(customerId)
        return (customer as Stripe.Customer).email
    } catch {
        return null
    }
}

async function handleSubscriptionEvent(event: Stripe.Event, type: 'created' | 'deleted', supabase: ReturnType<typeof createServerClient>) {
    const subscription = event.data.object as Stripe.Subscription
    const customerEmail = await getCustomerEmail(subscription.customer as string)

    if (!customerEmail) {
        return NextResponse.json({ status: 500, error: 'Customer email could not be fetched' })
    }

    const { id: subscription_id, customer: stripe_user_id, status, created, metadata, items } = subscription

    const username = metadata?.username || ''
    const domain = metadata?.domain || ''
    const email = metadata?.email || ''
    const password = metadata?.password || ''
    const user_id = metadata?.userId || ''
    const product_id = items.data[0]?.price.id
    const product = await stripe.products.retrieve(items.data[0]?.price.product as string)

    const subscriptionData: SubscriptionCreateType = {
        subscription_id,
        stripe_user_id: stripe_user_id as string,
        status: subscription.status,
        start_date: new Date(created * 1000).toISOString(),
        product_id: product_id,
        user_id: user_id,
    }

    const packageData: PackageCreateType = {
        package_name: product.name,
        domain,
        email,
        username,
        status: status as string,
        subscription_id,
        user_id,
    }

    const userData: DirectAdminCreateType = {
        username,
        domain,
        email,
        password,
        package_name: product.name,
    }

    let data, error

    switch (type) {
        case 'created':
            ;({ data, error } = await supabase.from('Subscription').insert([subscriptionData]).match({ subscription_id: subscriptionData.subscription_id }).select())
            ;({ data, error } = await supabase.from('Package').insert([packageData]).match({ subscription_id: subscriptionData.subscription_id }).select())
            await createDirectAdminUser(userData)
            break
        case 'deleted':
            ;({ data, error } = await supabase.from('Subscription').update({ status: 'cancelled', user_id: subscriptionData.user_id }).match({ subscription_id: subscriptionData.subscription_id }).select())
            ;({ data, error } = await supabase.from('Package').delete().match({ subscription_id: subscriptionData.subscription_id }).select())
            await deleteDirectAdminUser(userData.username)
    }

    if (error) {
        return NextResponse.json({ status: 500, error: error.message || `An error has occured (${type})` })
    }

    return NextResponse.json({ status: 200, message: `Subscription ${type} success`, data })
}

async function handleInvoiceEvent(event: Stripe.Event, status: 'succeeded' | 'failed', supabase: ReturnType<typeof createServerClient>) {
    const invoice = event.data.object as Stripe.Invoice
    const customerEmail = await getCustomerEmail(invoice.customer as string)

    if (!customerEmail) {
        return NextResponse.json({ status: 500, error: 'Customer email could not be fetched' })
    }

    const invoiceData: InvoiceCreateType = {
        invoice_id: invoice.id as string,
        invoice_pdf: invoice.invoice_pdf as string,
        hosted_invoice_url: invoice.hosted_invoice_url as string,
        amount_paid: status === 'succeeded' ? invoice.amount_paid / 100 : 0,
        amount_due: status === 'failed' ? invoice.amount_due / 100 : 0,
        currency: invoice.currency,
        status: invoice.status ?? status,
        email: customerEmail,
        subscription_id: invoice.parent?.subscription_details?.subscription as string,
        user_id: invoice.parent?.subscription_details?.metadata?.userId || '',
    }

    const { data, error } = await supabase.from('Invoice').insert([invoiceData])

    if (error) {
        return NextResponse.json({ status: 500, error: error.message || `Error inserting invoice (payment ${status})` })
    }

    return NextResponse.json({ status: 200, message: `Invoice payment ${status}`, data })
}

async function handleCheckoutSessionCompleted(event: Stripe.Event, supabase: ReturnType<typeof createServerClient>) {
    const session = event.data.object as Stripe.Checkout.Session
    const metadata = session?.metadata
    const subscriptionId = session.subscription

    try {
        await stripe.subscriptions.update(subscriptionId as string, { metadata })
        const { error } = await supabase.from('Invoice').update({ user_id: metadata?.userId }).eq('email', metadata?.email)

        if (error) {
            return NextResponse.json({ status: 500, error: error.message || 'Error updating invoice' })
        }

        return NextResponse.json({ status: 200, message: 'Subscription metadata updated successfully' })
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ status: 500, error: error.message || 'Error updating subscription metadata' })
        } else {
            throw new Error('An unknown error occurred')
        }
    }
}

async function webhooksHandler(reqText: string, request: NextRequest, supabase: ReturnType<typeof createServerClient>): Promise<NextResponse> {
    const sig = request.headers.get('Stripe-Signature')

    try {
        const event = await stripe.webhooks.constructEventAsync(reqText, sig!, process.env.STRIPE_WEBHOOK_SECRET!)

        switch (event.type) {
            case 'customer.subscription.created':
                return handleSubscriptionEvent(event, 'created', supabase)
            case 'customer.subscription.deleted':
                return handleSubscriptionEvent(event, 'deleted', supabase)
            case 'invoice.payment_succeeded':
                return handleInvoiceEvent(event, 'succeeded', supabase)
            case 'invoice.payment_failed':
                return handleInvoiceEvent(event, 'failed', supabase)
            case 'checkout.session.completed':
                return handleCheckoutSessionCompleted(event, supabase)
            default:
                return NextResponse.json({ status: 400, error: 'Unhandled event type' })
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ status: 500, error: error.message || 'Webhook Error: Invalid Signature' })
        } else {
            throw new Error('An unknown error occurred')
        }
    }
}
