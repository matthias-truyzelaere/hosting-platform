'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import type { PackageReadType } from '@/types/package'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

interface PackageTableProps {
    packages: PackageReadType[]
}

export function PackageTable({ packages }: PackageTableProps) {
    if (!packages || packages.length === 0) {
        return (
            <div className="flex items-center justify-center h-24 rounded-md border mb-10">
                <span className="text-muted-foreground">You don&apos;t have any services</span>
            </div>
        )
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="min-w-[75px] w-[75px] text-center">#</TableHead>
                    <TableHead className="min-w-[100px] text-center">Package</TableHead>
                    <TableHead className="min-w-[100px] text-center">Status</TableHead>
                    <TableHead className="min-w-[200px] text-center">Domain</TableHead>
                    <TableHead className="min-w-[100px] text-center">Username</TableHead>
                    <TableHead className="min-w-[120px] text-center">Login URL</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {packages.map((packageType, index) => (
                    <TableRow key={packageType.id}>
                        <TableCell className="text-center">{index + 1}</TableCell>
                        <TableCell className="text-center">{packageType.package_name}</TableCell>
                        <TableCell className="text-center capitalize">{packageType.status}</TableCell>
                        <TableCell className="text-center">{packageType.domain.length > 25 ? `${packageType.domain.substring(0, 25)}...` : packageType.domain}</TableCell>
                        <TableCell className="text-center">{packageType.username}</TableCell>
                        <TableCell className="text-center">
                            <Button asChild variant="outline">
                                <Link href={`https://node.hunati.com:2222`} target="_blank" rel="noopener noreferrer" aria-label="Go to DirectAdmin">
                                    Login
                                </Link>
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
