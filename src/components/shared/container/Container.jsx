import { cn } from '@/utils/cn'
import React from 'react'

export default function Container({children, className}) {
    return (
        <div className={cn('max-w-7xl mx-auto px-4', className)}>{children}</div>
    )
}
