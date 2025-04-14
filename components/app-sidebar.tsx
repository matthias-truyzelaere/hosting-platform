import Link from 'next/link'
import * as React from 'react'
import { Syne } from 'next/font/google'
import { ArrowBigLeft, CreditCard, Home } from 'lucide-react'
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail } from '@/components/ui/sidebar'

const syne = Syne({
    subsets: ['latin'],
    display: 'swap',
})

const data = {
    navMain: [
        {
            title: 'Home',
            url: '/dashboard',
            target: '_self',
            icon: Home,
        },
        {
            title: 'Update Payment Info',
            url: 'https://billing.stripe.com/p/login/4gw4gjadq6IQc8M9AA',
            target: '_blank',
            icon: CreditCard,
        },
        {
            title: 'Go Back',
            url: '/',
            target: '_self',
            icon: ArrowBigLeft,
        },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar {...props}>
            <SidebarHeader className="h-16 border-b border-sidebar-border justify-center items-center">
                <Link href="/" aria-label="home" className={`flex items-center uppercase space-x-2 tracking-widest font-extrabold ${syne.className}`}>
                    Nyxa
                </Link>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {data.navMain.map((item) => {
                                const IconComponent = item.icon
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <Link href={item.url} target={item.target} aria-label={item.title} className="flex items-center">
                                                {IconComponent && <IconComponent className="mr-2 h-4 w-4" aria-hidden="true" strokeWidth={2} />}
                                                {item.title}
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    )
}
