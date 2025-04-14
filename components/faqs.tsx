import Link from 'next/link'

export default function FAQs() {
    return (
        <section id="faq" className="py-16">
            <div className="mx-auto max-w-5xl px-6">
                <div className="grid gap-y-12 px-2 lg:[grid-template-columns:1fr_auto]">
                    <div className="text-center lg:text-left">
                        <h2 className="mb-4 text-3xl font-semibold md:text-4xl">
                            Frequently Asked <br className="hidden lg:block" />
                            Questions
                        </h2>
                    </div>
                    <div className="divide-y divide-dashed sm:mx-auto sm:max-w-lg lg:mx-0">
                        <div className="py-6">
                            <h3 className="font-medium">How do I cancel my subscription?</h3>
                            <p className="text-muted-foreground mt-4">You can cancel your subscription at any time by logging into your account and clicking on the &apos;Update Payment Info&apos; button.</p>
                        </div>
                        <div className="py-6">
                            <h3 className="font-medium">Do you offer support?</h3>
                            <p className="text-muted-foreground mt-4">
                                Yes we do! You can mail us at{' '}
                                <Link href="mailto:support@nyxahosting.com" className="underline hover:text-white">
                                    support@nyxahosting.com
                                </Link>{' '}
                                for any questions or concerns you may have. You can also create a ticket inside your DirectAdmin dashboard.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
