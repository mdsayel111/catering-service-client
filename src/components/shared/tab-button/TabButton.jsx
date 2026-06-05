import React from 'react'

export default function TabButton({ value, label, handleTabClick, activeTab }) {
    return (
        <button
            onClick={() => handleTabClick(value)}
            className={`${activeTab === value ? 'bg-black text-white hover:bg-white hover:text-black' : 'bg-white text-black hover:bg-black hover:text-white'} px-5 my-1 py-3 duration-300 transition rounded-sm text-[16px] max-sm:text-[14px] font-bold `}
        >
            {label}
        </button>
    )
}
