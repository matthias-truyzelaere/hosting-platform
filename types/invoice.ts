export interface InvoiceCreateType {
    invoice_id: string
    invoice_pdf: string
    hosted_invoice_url: string
    amount_paid: number
    amount_due: number | null
    currency: string
    status: string
    email: string
    subscription_id: string
    user_id: string
}

export interface InvoiceReadType {
    id: string
    created_time: string
    invoice_id: string
    invoice_pdf: string
    hosted_invoice_url: string
    amount_paid: number
    currency: string
    status: string
}

export interface InvoicePaginationType {
    data: InvoiceReadType[]
    currentPage: number
    total: number | null
}
