import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export default function Loading() {
    const packageSkeletonRowCount = 5
    const invoiceSkeletonRowCount = 5

    return (
        <>
            <Skeleton className="h-8 w-1/4 mb-6" />

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="min-w-[75px] w-[75px] text-center">
                            <Skeleton className="h-5 w-4/5 mx-auto" />
                        </TableHead>
                        <TableHead className="min-w-[100px] text-center">
                            <Skeleton className="h-5 w-4/5 mx-auto" />
                        </TableHead>
                        <TableHead className="min-w-[100px] text-center">
                            <Skeleton className="h-5 w-4/5 mx-auto" />
                        </TableHead>
                        <TableHead className="min-w-[200px] text-center">
                            <Skeleton className="h-5 w-4/5 mx-auto" />
                        </TableHead>
                        <TableHead className="min-w-[100px] text-center">
                            <Skeleton className="h-5 w-4/5 mx-auto" />
                        </TableHead>
                        <TableHead className="min-w-[120px] text-center">
                            <Skeleton className="h-5 w-4/5 mx-auto" />
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Array.from({ length: packageSkeletonRowCount }).map((_, index) => (
                        <TableRow key={`package-skeleton-row-${index}`}>
                            <TableCell className="text-center">
                                <Skeleton className="h-4 w-3/4 mx-auto" />
                            </TableCell>
                            <TableCell className="text-center">
                                <Skeleton className="h-4 w-3/4 mx-auto" />
                            </TableCell>
                            <TableCell className="text-center">
                                <Skeleton className="h-4 w-3/4 mx-auto" />
                            </TableCell>
                            <TableCell className="text-center">
                                <Skeleton className="h-4 w-3/4 mx-auto" />
                            </TableCell>
                            <TableCell className="text-center">
                                <Skeleton className="h-4 w-3/4 mx-auto" />
                            </TableCell>
                            <TableCell className="text-center">
                                <Skeleton className="h-9 w-16 rounded-md mx-auto" />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Skeleton className="h-8 w-1/4 mt-6 mb-6" />

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="min-w-[75px] w-[75px] text-center">
                            <Skeleton className="h-5 w-4/5 mx-auto" />
                        </TableHead>
                        <TableHead className="min-w-[100px] text-center">
                            <Skeleton className="h-5 w-4/5 mx-auto" />
                        </TableHead>
                        <TableHead className="min-w-[100px] text-center">
                            <Skeleton className="h-5 w-4/5 mx-auto" />
                        </TableHead>
                        <TableHead className="min-w-[100px] text-center">
                            <Skeleton className="h-5 w-4/5 mx-auto" />
                        </TableHead>
                        <TableHead className="min-w-[120px] text-center">
                            <Skeleton className="h-5 w-4/5 mx-auto" />
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Array.from({ length: invoiceSkeletonRowCount }).map((_, index) => (
                        <TableRow key={`invoice-skeleton-row-${index}`}>
                            <TableCell className="text-center">
                                <Skeleton className="h-4 w-3/4 mx-auto" />
                            </TableCell>
                            <TableCell className="text-center">
                                <Skeleton className="h-4 w-3/4 mx-auto" />
                            </TableCell>
                            <TableCell className="text-center">
                                <Skeleton className="h-4 w-3/4 mx-auto" />
                            </TableCell>
                            <TableCell className="text-center">
                                <Skeleton className="h-4 w-3/4 mx-auto" />
                            </TableCell>
                            <TableCell className="text-center">
                                <Skeleton className="h-9 w-24 rounded-md mx-auto" />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}
