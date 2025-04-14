import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { WebhookEvent } from '@clerk/nextjs/server'
import { createUser, updateUser, deleteUser } from '@/lib/services/user'

export async function POST(req: Request) {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

    if (!WEBHOOK_SECRET) {
        return NextResponse.json({ status: 500, error: 'Server configuration error' })
    }

    const headerPayload = await headers()
    const svix_id = headerPayload.get('svix-id')
    const svix_timestamp = headerPayload.get('svix-timestamp')
    const svix_signature = headerPayload.get('svix-signature')

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return NextResponse.json({ status: 400, error: 'Error occured -- no svix headers' })
    }

    const payload = await req.json()
    const body = JSON.stringify(payload)

    const wh = new Webhook(WEBHOOK_SECRET)
    let evt: WebhookEvent

    try {
        evt = wh.verify(body, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        }) as WebhookEvent
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ status: 400, error: error.message || 'Invalid signature' })
        } else {
            throw new Error('An unknown error occurred')
        }
    }

    const eventType = evt.type

    try {
        switch (eventType) {
            case 'user.created':
                await createUser({
                    email: payload?.data?.email_addresses?.[0]?.email_address,
                    first_name: payload?.data?.first_name,
                    last_name: payload?.data?.last_name,
                    profile_image_url: payload?.data?.profile_image_url,
                    user_id: payload?.data?.id,
                })
                return NextResponse.json({ status: 200, message: 'User created successfully' })
            case 'user.updated':
                await updateUser({
                    email: payload?.data?.email_addresses?.[0]?.email_address,
                    first_name: payload?.data?.first_name,
                    last_name: payload?.data?.last_name,
                    profile_image_url: payload?.data?.profile_image_url,
                    user_id: payload?.data?.id,
                })
                return NextResponse.json({ status: 200, message: 'User updated successfully' })
            case 'user.deleted':
                await deleteUser(payload?.data?.id)
                return NextResponse.json({ status: 200, message: 'User deleted successfully' })
            default:
                return NextResponse.json({ status: 400, message: `Unhandled event type: ${eventType}` })
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ status: 500, error: error.message || 'Internal Server Error processing event' })
        } else {
            throw new Error('An unknown error occurred')
        }
    }
}
