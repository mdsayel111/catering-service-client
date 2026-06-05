"use client"

import SelectInput from '@/components/shared/inputs/select-input/SelectInput'
import Pagination from '@/components/shared/pagination/Pagination'
import PurchaseCard from '@/components/shared/purchase-table/components/purchase-card/PurchaseCard'
import PurchaseTable from '@/components/shared/purchase-table/PurchaseTable'
import { purchaseHistory } from '@/data'
import { useState } from 'react'

export default function page() {
    const [history, setHistory] = useState("all")
    const [currentPage, setCurrentPage] = useState(1)
    return (
        <div className="w-full">
            <div className="flex justify-between items-center mx-10">
                <h4 className="font-bold text-[20px] mb-2 max-sm:text-[14px]">
                    Purchase History
                </h4>

                <div className='mb-4'>
                    <SelectInput options={[{ value: "all", label: "All History" }, { value: "Pending", label: "Pending Orders" }, { value: "Processing", label: "Processing Orders" }, { value: "Completed", label: "Completed Orders" }, { value: "Cancelled", label: "Cancelled Orders" }]} value={history} setValue={setHistory} inputClass={"shadow-none"} />
                </div>
            </div>

            <div className="bg-white p-3 mx-5 rounded-sm">
                <PurchaseTable
                    titles={['Details', 'Amount', 'Delivery Status', 'Payment Status']}
                    items={purchaseHistory}
                    Card={PurchaseCard}
                    purchaseCardProps={{ hasPaymentStatus: true }}
                />
                <Pagination currentPage={1} totalPages={5} setCurrentPage={setCurrentPage} />
            </div>
        </div>
    )
}
