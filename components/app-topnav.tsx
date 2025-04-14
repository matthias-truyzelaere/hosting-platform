'use client'

import { dark } from '@clerk/themes'
import { useTheme } from 'next-themes'
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { ModeToggle } from '@/components/ui/mode-toggle'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'

const breadcrumbMap: Record<string, string> = {
    '/dashboard': 'Home',
}

export function AppTopNav() {
    const { theme } = useTheme()
    const pathname = usePathname()
    const breadcrumbTitle = breadcrumbMap[pathname] || 'Home'

    return (
        <header className="flex h-16 items-center justify-between border-b px-4">
            <nav className="flex items-center gap-2" aria-label="breadcrumb">
                <SidebarTrigger className="cursor-pointer -ml-1" />
                <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem className="hidden md:block">
                            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block" />
                        <BreadcrumbItem>
                            <BreadcrumbPage>{breadcrumbTitle}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </nav>
            <div className="flex items-center gap-4">
                <UserButton appearance={{ baseTheme: theme === 'dark' ? dark : undefined }} />
                <ModeToggle />
            </div>
        </header>
    )
}
