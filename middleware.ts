import { ratelimit } from './lib/redis'
import { NextRequest, NextResponse } from 'next/server'
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher(['/', '/sign-in(.*)', '/sign-up(.*)'])
const isWebhookRoute = createRouteMatcher(['/api/webhooks/clerk', '/api/webhooks/stripe'])

export default clerkMiddleware(async (auth, req: NextRequest) => {
    const forwarded = req.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown'

    if (isWebhookRoute(req)) {
        const { success } = await ratelimit.limit(ip)
        if (!success) {
            return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
        }
        return NextResponse.next()
    }

    if (isPublicRoute(req)) {
        return NextResponse.next()
    }

    if (!isPublicRoute(req)) {
        if (ip === 'unknown') {
            return NextResponse.json({ error: 'Unable to determine IP address for rate limiting' }, { status: 400 })
        }

        const { success } = await ratelimit.limit(ip)
        if (!success) {
            return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
        }

        try {
            await auth.protect()
        } catch (error) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }
    }
})

export const config = {
    matcher: ['/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)', '/(api|trpc)(.*)'],
}
