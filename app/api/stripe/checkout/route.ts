import Stripe from 'stripe'
import { NextRequest, NextResponse } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: NextRequest) {
    const { priceId, domain, email, username, password, name, userId } = await req.json()

    if (!priceId || !domain || !email || !username || !password || !name || !userId) {
        return NextResponse.json({ status: 400, error: 'Missing required parameters.' })
    }

    try {
        const customers = await stripe.customers.list({ email: email, limit: 1 })
        let stripeCustomerId: string

        if (customers.data.length > 0) {
            stripeCustomerId = customers.data[0].id
        } else {
            const customer = await stripe.customers.create({
                email: email,
                name: name,
                metadata: {
                    userId: userId,
                },
            })
            stripeCustomerId = customer.id
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{ price: priceId, quantity: 1 }],
            mode: 'subscription',
            success_url: `${process.env.DOMAIN_URL}/dashboard`,
            cancel_url: `${process.env.DOMAIN_URL}/`,
            allow_promotion_codes: true,
            customer: stripeCustomerId,
            subscription_data: {
                metadata: {
                    userId: userId,
                    username: username,
                    domain: domain,
                    email: email,
                    password: password,
                },
            },
        })

        return NextResponse.json({ status: 200, sessionId: session.id })
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ status: 500, error: error.message || 'Failed to create checkout session.' })
        } else {
            throw new Error('An unknown error occurred')
        }
    }
}
