'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { PurchaseDialog } from '@/components/ui/purchase-dialog'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Pricing() {
    const { user } = useUser()
    const [isYearly, setIsYearly] = useState(false)
    const toggleBillingPeriod = () => setIsYearly((prev) => !prev)

    return (
        <section id="pricing" className="py-16">
            <div className="flex flex-col gap-14 mx-auto max-w-6xl px-6">
                <div className="mx-auto max-w-2xl space-y-6 text-center">
                    <h2 className="text-center text-4xl font-semibold lg:text-5xl">Pricing that Scales with You</h2>
                    <p>Gemini is evolving to be more than just the models. It supports an entire to the APIs and platforms helping developers and businesses innovate.</p>
                </div>
                <div className="flex flex-row items-center justify-center gap-3 mx-auto max-w-2xl space-y-6">
                    <Label className={`m-0 ${!isYearly ? 'text-white' : 'text-gray-400'} transition-colors`} htmlFor="billing-period">
                        Monthly
                    </Label>
                    <Switch className="m-0 cursor-pointer" id="billing-period" checked={isYearly} onCheckedChange={toggleBillingPeriod} />
                    <Label className={`m-0 ${isYearly ? 'text-white' : 'text-gray-400'} transition-colors`} htmlFor="billing-period">
                        Yearly
                    </Label>
                </div>
                <div className="grid gap-6 md:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-medium">Bronze</CardTitle>
                            <span className="my-3 block text-2xl font-semibold">{isYearly ? '€24.99 / yr' : '€2.49 / mo'}</span>
                            <CardDescription className="text-sm">*You will be billed {isYearly ? 'yearly' : 'monthly'}</CardDescription>
                            <PurchaseDialog priceId={isYearly ? 'price_1RDXo0C57enc7Dzei5kTk0ms' : 'price_1RDXo0C57enc7Dze8I1V3rMS'} buttonLabel="Buy Bronze" outline={true} user={user} />
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <hr className="border-dashed" />
                            <ul className="list-outside space-y-3 text-sm">
                                {['1 Website', '5GB SSD Storage', 'Unlimited Databases', 'Unlimited Subdomains', 'Unlimited FTP Accounts', 'Unlimited Email Accounts', 'Unlimited SSL Certificates'].map((item, index) => (
                                    <li key={index} className="flex items-center gap-2">
                                        <Check className="size-3" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                    <Card className="relative">
                        <span className="bg-linear-to-br/increasing absolute inset-x-0 -top-3 mx-auto flex h-6 w-fit items-center rounded-full from-purple-400 to-amber-300 px-3 py-1 text-xs font-medium text-amber-950 ring-1 ring-inset ring-white/20 ring-offset-1 ring-offset-gray-950/5">Popular</span>
                        <CardHeader>
                            <CardTitle className="font-medium">Gold</CardTitle>
                            <span className="my-3 block text-2xl font-semibold">{isYearly ? '€49.99 / yr' : '€4.99 / mo'}</span>
                            <CardDescription className="text-sm">*You will be billed {isYearly ? 'yearly' : 'monthly'}</CardDescription>
                            <PurchaseDialog priceId={isYearly ? 'price_1RDXofC57enc7DzePaVNGyi5' : 'price_1RDXofC57enc7DzerhpnRk2X'} buttonLabel="Buy Gold" outline={false} user={user} />
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <hr className="border-dashed" />
                            <ul className="list-outside space-y-3 text-sm">
                                {['3 Websites', '15GB SSD Storage', 'Everything in Bronze Plan'].map((item, index) => (
                                    <li key={index} className="flex items-center gap-2">
                                        <Check className="size-3" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                    <Card className="flex flex-col">
                        <CardHeader>
                            <CardTitle className="font-medium">Diamond</CardTitle>
                            <span className="my-3 block text-2xl font-semibold">{isYearly ? '€99.99 / yr' : '€9.99 / mo'}</span>
                            <CardDescription className="text-sm">*You will be billed {isYearly ? 'yearly' : 'monthly'}</CardDescription>
                            <PurchaseDialog priceId={isYearly ? 'price_1RDXpGC57enc7DzeRTV2iqsG' : 'price_1RDXpGC57enc7DzeedzmztlO'} buttonLabel="Buy Diamond" outline={true} user={user} />
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <hr className="border-dashed" />
                            <ul className="list-outside space-y-3 text-sm">
                                {['5 Websites', '25GB Cloud Storage', 'Everything in Gold Plan'].map((item, index) => (
                                    <li key={index} className="flex items-center gap-2">
                                        <Check className="size-3" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}
