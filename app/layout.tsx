import './globals.css'
import React from 'react'
import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from '@/components/ui/sonner'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { ThemeProvider } from '@/components/theme-provider'

export const metadata: Metadata = {
    title: 'Nyxa Hosting - Host Like Never Before',
    description: 'Host Like Never Before',
    keywords: ['webhosting', 'directadmin hosting', 'cheap webhosting'],
    authors: [{ name: 'Matthias Truyzelaere', url: 'https://algory-ai.com' }],
    openGraph: {
        title: 'Nyxa Hosting',
        description: 'Host Like Never Before',
        url: process.env.DOMAIN_URL,
        images: [
            {
                url: 'https://nyxahosting.com/hero-section.webp',
                alt: 'Nyxa Hosting',
                height: 2000,
                width: 1500,
            },
        ],
        siteName: 'Nyxa Hosting',
        locale: 'en_US',
        type: 'website',
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <ClerkProvider>
            <html lang="en" suppressHydrationWarning>
                <body>
                    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
                        {children}
                        <Toaster />
                        <Analytics />
                        <SpeedInsights />
                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider>
    )
}
