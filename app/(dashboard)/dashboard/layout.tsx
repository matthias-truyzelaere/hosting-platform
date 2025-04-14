import React from 'react'
import { AppTopNav } from '@/components/app-topnav'
import { AppSidebar } from '@/components/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <main>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <AppTopNav />
                    <section className="p-6 md:p-8 lg:p-16">{children}</section>
                </SidebarInset>
            </SidebarProvider>
        </main>
    )
}
