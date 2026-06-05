import { cn } from '@/utils/cn'
import React from 'react'

export default function PaymentStatusButton({ status }) {
    return (
        <button
            className={cn(`mx-3 max-sm:text-[10px] py-2 text-[14px] w-[100px] px-5 transition duration-300 rounded-md`, status === 'Unpaid' && 'bg-red-100 text-red-600', status === 'Paid' && 'bg-green-100 text-green-600')}
        >
            {status}
        </button>
    )
}
