import { Zap, Settings2, ShieldCheck, Server, PackagePlus, LifeBuoy } from 'lucide-react'

export default function Features() {
    return (
        <section id="features" className="py-16">
            <div className="flex flex-col gap-14 mx-auto max-w-6xl px-6">
                <div className="mx-auto max-w-2xl space-y-6 text-center">
                    <h2 className="text-center text-4xl font-semibold lg:text-5xl">Powerful & Simple Hosting with DirectAdmin</h2>
                    <p>Get reliable, high-performance web hosting powered by the user-friendly DirectAdmin control panel. Perfect for beginners and experts alike.</p>
                </div>
                <div className="relative mx-auto grid max-w-4xl divide-x divide-y border *:p-12 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Zap className="size-4" />
                            <h3 className="text-sm font-medium">Blazing Fast Speeds</h3>
                        </div>
                        <p className="text-sm">Experience lightning-fast load times with our optimized servers, often featuring NVMe SSD storage.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Settings2 className="size-4" />
                            <h3 className="text-sm font-medium">Full Control</h3>
                        </div>
                        <p className="text-sm">Manage your website, domains, email, files, and databases effortlessly with the clean DirectAdmin interface.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="size-4" />
                            <h3 className="text-sm font-medium">Robust Security</h3>
                        </div>
                        <p className="text-sm">Protect your site with free SSL certificates (Let&apos;s Encrypt), regular backups, and proactive security measures.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Server className="size-4" />
                            <h3 className="text-sm font-medium">Reliable Uptime</h3>
                        </div>
                        <p className="text-sm">Count on excellent uptime and stable performance, keeping your website accessible to visitors 24/7.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <PackagePlus className="size-4" />
                            <h3 className="text-sm font-medium">Easy App Installs</h3>
                        </div>
                        <p className="text-sm">Install WordPress, Joomla, and hundreds of other applications with just a few clicks using Softaculous (or similar).</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <LifeBuoy className="size-4" />
                            <h3 className="text-sm font-medium">Expert Support</h3>
                        </div>
                        <p className="text-sm">Our friendly and knowledgeable support team is here to help you whenever you need assistance.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
