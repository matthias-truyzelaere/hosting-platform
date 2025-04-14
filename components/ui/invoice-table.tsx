'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import type { InvoicePaginationType } from '@/types/invoice'
import { usePathname, useSearchParams } from 'next/navigation'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'

const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return '-'
    try {
        return new Intl.DateTimeFormat('en-GB', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).format(new Date(dateString))
    } catch {
        return 'Invalid Date'
    }
}

const generatePagination = (currentPage: number, totalPages: number) => {
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    if (currentPage <= 3) {
        return [1, 2, 3, '...', totalPages - 1, totalPages]
    }

    if (currentPage >= totalPages - 2) {
        return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages]
    }

    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages]
}

export function InvoiceTable({ data, currentPage, total }: InvoicePaginationType) {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const totalPages = Math.ceil(total! / 10)

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams)
        params.set('page', pageNumber.toString())
        return `${pathname}?${params.toString()}`
    }

    const startIndex = (currentPage - 1) * 10
    const paginationItems = generatePagination(currentPage, totalPages)

    if (total === 0 || data.length === 0) {
        return (
            <div className="flex items-center justify-center h-24 rounded-md border mb-10">
                <span className="text-muted-foreground">You don&apos;t have any invoices</span>
            </div>
        )
    }

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="min-w-[75px] w-[75px] text-center">#</TableHead>
                        <TableHead className="min-w-[100px] text-center">Status</TableHead>
                        <TableHead className="min-w-[100px] text-center">Amount Paid</TableHead>
                        <TableHead className="min-w-[100px] text-center">Date</TableHead>
                        <TableHead className="min-w-[120px] text-center">Invoice</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((invoice, index) => (
                        <TableRow key={invoice.id || invoice.invoice_id}>
                            <TableCell className="text-center">{startIndex + index + 1}</TableCell>
                            <TableCell className="text-center capitalize">{invoice.status || '-'}</TableCell>
                            <TableCell className="text-center">€{invoice.amount_paid}</TableCell>
                            <TableCell className="text-center">{formatDate(invoice.created_time)}</TableCell>
                            <TableCell className="text-center">
                                {invoice.status === 'open' ? (
                                    invoice.hosted_invoice_url ? (
                                        <Button asChild variant="default">
                                            <Link href={invoice.hosted_invoice_url} target="_blank" rel="noopener noreferrer" aria-label={`Pay invoice ${invoice.invoice_id || index + 1}`}>
                                                Pay Invoice
                                            </Link>
                                        </Button>
                                    ) : (
                                        <span className="text-xs text-muted-foreground">Payment Link Unavailable</span>
                                    )
                                ) : invoice.invoice_pdf ? (
                                    <Button asChild variant="outline">
                                        <Link href={invoice.invoice_pdf} target="_blank" rel="noopener noreferrer" aria-label={`Download invoice ${invoice.invoice_id || index + 1}`}>
                                            Download
                                        </Link>
                                    </Button>
                                ) : (
                                    <span className="text-xs text-muted-foreground">N/A</span>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {totalPages > 1 && (
                <div className="flex items-center justify-center">
                    <Pagination className="w-auto mx-0">
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious href={createPageURL(currentPage - 1)} aria-disabled={currentPage <= 1} className={currentPage <= 1 ? 'pointer-events-none opacity-50' : undefined} />
                            </PaginationItem>

                            {paginationItems.map((item, index) => (
                                <PaginationItem key={`${item}-${index}`}>
                                    {item === '...' ? (
                                        <PaginationEllipsis />
                                    ) : (
                                        <PaginationLink href={createPageURL(item)} isActive={currentPage === item} aria-current={currentPage === item ? 'page' : undefined}>
                                            {item}
                                        </PaginationLink>
                                    )}
                                </PaginationItem>
                            ))}
                            <PaginationItem>
                                <PaginationNext href={createPageURL(currentPage + 1)} aria-disabled={currentPage >= totalPages} className={currentPage >= totalPages ? 'pointer-events-none opacity-50' : undefined} />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
        </>
    )
}
