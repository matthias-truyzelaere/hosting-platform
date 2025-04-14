import React from 'react'
import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'
import { PackageReadType } from '@/types/package'
import { getPackages } from '@/lib/services/package'
import { getInvoices } from '@/lib/services/invoice'
import { InvoicePaginationType } from '@/types/invoice'
import { PackageTable } from '@/components/ui/package-table'
import { InvoiceTable } from '@/components/ui/invoice-table'

export default async function Page({ searchParams }: { searchParams: Promise<{ page?: string | undefined }> }) {
    const { userId } = await auth()

    if (!userId) {
        redirect('/sign-in')
    }

    const params = await searchParams
    const currentPage = Math.max(1, Number(params?.page || '1'))

    let packages: PackageReadType[] = []
    let invoices: InvoicePaginationType = { data: [], currentPage, total: 0 }

    try {
        invoices = await getInvoices(userId, currentPage)
        packages = await getPackages(userId)
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message)
        } else {
            throw new Error('An unknown error occurred')
        }
    }

    return (
        <>
            <h1 className="text-3xl font-bold mb-6">Services</h1>
            <PackageTable packages={packages} />
            <h1 className="text-3xl font-bold mb-6">Invoices</h1>
            <InvoiceTable data={invoices.data} currentPage={invoices.currentPage} total={invoices.total ?? 0} />
        </>
    )
}
