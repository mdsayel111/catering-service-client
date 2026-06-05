import React from 'react'

export default function StatusButton({status}) {
    return (
        <button
            className={`mx-3 max-sm:text-[10px] py-2 text-[14px] w-[100px]  flex justify-center items-center transition duration-300 rounded-md  ${status === 'Processing' && 'bg-blue-100 text-blue-600'} ${status === 'Completed' && 'bg-green-100 text-green-600'} ${status === 'Cancelled' && 'bg-red-100 text-red-600'} ${status === 'Pending' && 'bg-yellow-100 text-yellow-600'}`}>
            {status}
        </button>
    )
}
