import React from 'react'

export default function CheckoutCard({ item }) {
    return (
        <div
            className="flex-shrink-0 flex justify-between items-center border p-3 rounded-md bg-white"
        >
            <div className="flex gap-2 md:gap-4 items-center">
                <img
                    className="w-8 sm:w-20"
                    src={item.image}
                    alt=""
                />
                <h4 className="text-[8px] sm:text-sm font-semibold text-gray-700">
                    {item.name}
                </h4>
            </div>
            <div
                className="text-[8px] sm:text-sm flex gap-4 md:gap-6 lg:gap-12 font-semibold items-end text-right"
            >
                <p>${item.price}</p>
                <p className="text-gray-600">Qty: {item.quantity}</p>
                <p>${item.price * item.quantity}</p>
            </div>
        </div>
    )
}
