import { cn } from '@/lib/utils';
import React from 'react'

export const Topbar = ({
    children,
    className
}: {
    children: React.ReactNode;
    className?: string
}) => {
    return (
        <div className={cn('flex items-center bg-card gap-6 w-full min-h-20 border-b p-4 text-3xl font-bold text-muted-foreground', className)}>
            {children}
        </div>
    )
}