import { toast } from 'sonner'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { UserResource } from '@clerk/types'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Eye, EyeOff, Copy } from 'lucide-react'
import { handleCheckout } from '@/lib/stripe/checkout'
import { generateStrongPassword } from '@/lib/security/password'
import { checkAvailabilityUsername } from '@/lib/services/package'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

export const PurchaseDialog = ({ priceId, buttonLabel, outline, user }: { priceId: string; buttonLabel: string; outline: boolean; user: UserResource | null | undefined }) => {
    const router = useRouter()

    const [domain, setDomain] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const validateForm = async (): Promise<boolean> => {
        if (!domain || !email || !username || !password) {
            toast.error('Please fill in all required fields, including password.')
            return false
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailPattern.test(email)) {
            toast.error('Please enter a valid email address.')
            return false
        }

        const domainPattern = /^(?!-)[A-Za-z0-9-]{1,63}(?<!-)\.[A-Za-z]{2,}$/
        if (!domainPattern.test(domain)) {
            toast.error('Please enter a valid domain name.')
            return false
        }

        const startWithLetter = /^[a-z]/
        if (!startWithLetter.test(username) || username.length < 3 || username.length > 10) {
            toast.error('The username must start with a lowercase letter and be 3-10 characters long.')
            return false
        }

        if (password.length < 8 || password.length > 16) {
            toast.error('The password must be between 8 and 16 characters long.')
            return false
        }

        try {
            const isUsernameTaken = await checkAvailabilityUsername(username)

            if (isUsernameTaken) {
                toast.error('The username is already taken. Please choose another one.')
                return false
            }

            return true
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(`An error occurred while checking username availability: ${error.message}`)
                return false
            } else {
                throw new Error('An unknown error occurred')
            }
        }
    }

    const handleGeneratePassword = () => {
        const newPassword = generateStrongPassword()
        setPassword(newPassword)
        setIsPasswordVisible(true)
        toast.success('Password generated and filled in.')
    }

    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prev) => !prev)
    }

    const copyPasswordToClipboard = () => {
        if (!password) {
            toast.error('No password to copy.')
            return
        }
        navigator.clipboard
            .writeText(password)
            .then(() => {
                toast.success('Password copied to clipboard!')
            })
            .catch((err) => {
                console.error('Failed to copy password: ', err)
                toast.error('Failed to copy password.')
            })
    }

    const handlePurchase = async () => {
        const isValid = await validateForm()

        if (!isValid) {
            return
        }

        return handleCheckout(priceId, domain, email, username, password, user)
    }

    const handleOpenChange = (open: boolean) => {
        if (!open) {
            setDomain('')
            setEmail('')
            setUsername('')
            setPassword('')
            setIsPasswordVisible(false)
        }
    }

    return (
        <Dialog onOpenChange={handleOpenChange}>
            <DialogTrigger
                onClick={(e) => {
                    if (!user?.id) {
                        e.preventDefault()
                        toast('Please login or sign up to purchase', {
                            description: 'You must be logged in to make a purchase',
                            action: {
                                label: 'Sign Up',
                                onClick: () => router.push('/sign-up'),
                            },
                        })
                    }
                }}
                asChild>
                <Button variant={outline ? 'outline' : 'default'} className="cursor-pointer mt-4 w-full">
                    {buttonLabel}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Account details</DialogTitle>
                    <DialogDescription>Please add your domain, username, and password. This will be used to create your DirectAdmin account.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="domain" className="text-right">
                            Domain
                        </Label>
                        <Input id="domain" placeholder="example.com" className="col-span-3" required value={domain} onChange={(e) => setDomain(e.target.value)} />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                            Email
                        </Label>
                        <Input type="email" id="email" placeholder="john.doe@example.com" className="col-span-3" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Username
                        </Label>
                        <Input id="username" placeholder="johndoe" className="col-span-3" required value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="grid grid-cols-4 items-baseline gap-4">
                        <Label htmlFor="password" className="text-right">
                            Password
                        </Label>
                        <div className="col-span-3 space-y-2">
                            <div className="relative">
                                <Input type={isPasswordVisible ? 'text' : 'password'} id="password" placeholder="Enter or generate password" className="pr-16" required value={password} onChange={(e) => setPassword(e.target.value)} />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                                    <Button type="button" variant="ghost" size="icon" onClick={copyPasswordToClipboard} className="h-7 w-7 text-muted-foreground hover:text-primary cursor-pointer" aria-label="Copy password">
                                        <Copy className="h-4 w-4" />
                                    </Button>
                                    <Button type="button" variant="ghost" size="icon" onClick={togglePasswordVisibility} className="h-7 w-7 text-muted-foreground hover:text-primary cursor-pointer" aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}>
                                        {isPasswordVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </Button>
                                </div>
                            </div>
                            <div className="text-sm">
                                Or{' '}
                                <button type="button" onClick={handleGeneratePassword} className="underline cursor-pointer focus:outline-none">
                                    generate
                                </button>{' '}
                                a password.
                            </div>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handlePurchase} variant="outline" className="cursor-pointer mt-4 w-full">
                        Proceed To Payment
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
