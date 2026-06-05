import React from 'react'

export default function StatsCard({ stats }) {
    return (
        <div
            className="bg-white shadow-lg border hover:bg-black hover:text-white transition duration-300 rounded-md p-5 max-sm:p-2 flex flex-col items-center justify-center">
            <div
                className="w-14 h-14 max-sm:w-12 max-sm:h-12 rounded-full relative bg-gray-200 flex items-center justify-center">
                <stats.icon className="fa-solid fa-star text-2xl max-sm:text-xl text-[black]"></stats.icon>
            </div>

            <h5 className="text-[14px] max-sm:text-[12px] mt-5 max-sm:mt-2">
                {stats.title}
            </h5>
            <strong className="text-xl max-sm:text-sm">{stats.value}</strong>
        </div>
    )
}
