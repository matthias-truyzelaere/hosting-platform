'use server'

import { cookies } from 'next/headers'
import { UserType } from '@/types/user'
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

export const createUser = async ({ email, first_name, last_name, profile_image_url, user_id }: UserType) => {
    const supabase = await getSupabaseServerClient()

    try {
        const { data, error } = await supabase.from('User').insert([{ email, first_name, last_name, profile_image_url, user_id }]).select().maybeSingle()

        if (error) {
            throw new Error(`Database error creating user: ${error.message} (Code: ${error.code})`)
        }

        if (!data) {
            throw new Error('Database error: User created but failed to retrieve the record.')
        }

        return data
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message || 'An unexpected error occurred during user creation.')
        } else {
            throw new Error('An unknown error occurred')
        }
    }
}

export const updateUser = async ({ email, first_name, last_name, profile_image_url, user_id }: UserType) => {
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

    try {
        const { data, error } = await supabase.from('User').update([{ email, first_name, last_name, profile_image_url, user_id }]).eq('email', email).select().maybeSingle()

        if (error) {
            throw new Error(`Database error updating user: ${error.message} (Code: ${error.code})`)
        }

        if (!data) {
            throw new Error(`Database error: User with ID ${user_id} not found for update.`)
        }

        return data
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message || 'An unexpected error occurred during user creation.')
        } else {
            throw new Error('An unknown error occurred')
        }
    }
}

export const deleteUser = async (user_id: string) => {
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

    try {
        const { error } = await supabase.from('User').delete().eq('user_id', user_id)

        if (error) {
            throw new Error(`Database error updating user: ${error.message} (Code: ${error.code})`)
        }

        return { success: true, message: 'User deleted successfully' }
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message || 'An unexpected error occurred during user creation.')
        } else {
            throw new Error('An unknown error occurred')
        }
    }
}
