'use server'

import { cookies } from 'next/headers'
import { PackageReadType } from '@/types/package'
import { createServerClient } from '@supabase/ssr'

async function getSupabaseServerClient() {
    const cookieStore = await cookies()

    return createServerClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!, {
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
}

export async function getPackages(userId: string): Promise<PackageReadType[]> {
    const supabase = await getSupabaseServerClient()

    if (!userId) {
        throw new Error(`No user id available`)
    }

    try {
        const { data, error } = await supabase.from('Package').select('*').eq('user_id', userId).order('created_time', { ascending: true })

        if (error) {
            throw new Error(`Database error fetching packages: ${error.message}`)
        }

        return (data || []) as PackageReadType[]
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message || 'An unexpected error occurred fetching packages.')
        } else {
            throw new Error('An unknown error occurred')
        }
    }
}

export async function checkAvailabilityUsername(username: string): Promise<boolean> {
    const supabase = await getSupabaseServerClient()

    if (!username) {
        throw new Error(`No username provided`)
    }

    try {
        const { data, error } = await supabase.from('Package').select('*').eq('username', username)

        if (error) {
            throw new Error(`Database error fetching usernames: ${error.message}`)
        }

        return data && data.length > 0
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message || 'An unexpected error occurred fetching usernames.')
        } else {
            throw new Error('An unknown error occurred')
        }
    }
}
