import React from 'react'

export default function PurchaseTable({ titles, items, Card, purchaseCardProps }) {
    return (
        <div className='overflow-x-auto w-full'>
            <table className="table-auto text-left w-full">
                <thead className="border-b border-dotted">
                    <tr className="text-sm font-semibold text-gray-700">
                        {
                            titles.map((title, index) => (
                                <th className="p-3 max-sm:text-[14px]">{title}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        items.map((item, index) => (
                            <Card key={index} {...purchaseCardProps} item={item} />
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
