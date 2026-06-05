import React from 'react'

export default function OrderCard({ item }) {
    return (
        <div
            className="mx-4 md:mx-5 flex sm:flex-wrap max-md:flex-row items-center justify-between max-sm:gap-2 gap-5 p-3 my-3 mb-5 border rounded-md"
        >
            <div
                className="flex items-center gap-4 max-sm:gap-2 w-full sm:w-auto max-sm:flex-col"
            >
                <div
                    className="w-[80px] h-[80px] flex items-center justify-center overflow-hidden rounded"
                >
                    <img
                        src={item.image}
                        alt="Product"
                        className="w-full h-full object-cover"
                    />
                </div>
                <h3
                    className="text-[16px] max-md:hidden max-sm:text-[14px] font-semibold"
                >
                    {item.name}
                </h3>
            </div>

            <div
                className="flex gap-5 max-sm:text-[14px] w-full sm:w-auto max-sm:gap-1 max-sm:flex-col"
            >
                <h3
                    className="text-[16px] md:hidden max-sm:text-[14px] font-semibold"
                >
                    {item.name}
                </h3>
                <h3 className="font-medium">
                    Qty: <span className="font-normal text-gray-400">{item.quantity}</span>
                </h3>
                <h5 className="font-medium">
                    Amount: <span className="font-normal text-gray-400">${item.price * item.quantity}</span>
                </h5>
            </div>
        </div>
    )
}
