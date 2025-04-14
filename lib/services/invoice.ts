'use server'

import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import type { InvoiceReadType } from '@/types/invoice'

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

export async function getInvoices(userId: string, page: number): Promise<{ data: InvoiceReadType[]; currentPage: number; total: number | null }> {
    const supabase = await getSupabaseServerClient()

    if (!userId) {
        throw new Error(`No user id available`)
    }

    if (page < 1) {
        page = 1
    }

    const rangeFrom = (page - 1) * 10
    const rangeTo = rangeFrom + 10 - 1

    try {
        const { data, error, count } = await supabase.from('Invoice').select('*', { count: 'exact' }).eq('user_id', userId).order('created_time', { ascending: true }).range(rangeFrom, rangeTo)

        if (error) {
            throw new Error(`Database error fetching invoices: ${error.message}`)
        }

        return { data: (data || []) as InvoiceReadType[], currentPage: page, total: count }
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message || 'An unexpected error occurred fetching invoices.')
        } else {
            throw new Error('An unknown error occurred')
        }
    }
}
