import axios from 'axios'
import { toast } from 'sonner'
import { loadStripe } from '@stripe/stripe-js'
import { type UserResource } from '@clerk/types'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!)

export const handleCheckout = async (priceId: string, domain: string, email: string, username: string, password: string, user: UserResource | null | undefined) => {
    try {
        const { data } = await axios.post(`/api/stripe/checkout`, { priceId, domain, email, username, password, name: user?.fullName, userId: user?.id })

        if (data.sessionId) {
            const stripe = await stripePromise
            return await stripe?.redirectToCheckout({ sessionId: data.sessionId })
        } else {
            toast('Failed to create checkout session')
            return
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            toast(`Error during checkout: ${error.message}`)
            return
        } else {
            throw new Error('An unknown error occurred')
        }
    }
}
