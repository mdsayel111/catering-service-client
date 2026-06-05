import StatusButton from '@/components/shared/purchase-table/components/purchase-card/components/status-button/StatusButton'
import React from 'react'
import PaymentStatusButton from './components/payment-status-button/PaymentStatusButton'

export default function PurchaseCard({ item, hasPaymentStatus }) {
    return (
        <tr className="border-b border-dotted">
            <td className="p-3">
                <div>
                    <h6 className="text-[14px] max-sm:text-[12px] text-gray-500 text-nowrap">
                        Order ID: {item.orderId}
                    </h6>
                    <p className="text-[12px] text-gray-500 text-nowrap">
                        Packege: {item.packageId}
                    </p>
                    <p className="text-[12px] text-nowrap">{item.date}</p>
                </div>
            </td>
            <td className="p-3 max-sm:text-[10px]">${item.amount}</td>
            <td className="p-3">
                <div>
                    <StatusButton status={item.status} />
                </div>
            </td>
            <td className="p-3">
                <div>
                    {
                        hasPaymentStatus && <PaymentStatusButton status={item.paymentStatus} />
                    }
                </div>
            </td>
        </tr>
    )
}
