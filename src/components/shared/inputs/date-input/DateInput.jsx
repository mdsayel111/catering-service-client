import React from 'react'

export default function DateInput({ label, placeholder, value, setValue }) {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor="dob" className="text-[16px] max-sm:text-[14px]"
            >{label}</label>
            <input
                type="date"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                name="dob"
                id="dob"
                placeholder={placeholder}
                className="w-full px-5 py-3 border rounded-sm shadow-sm bg-white"
            />
        </div>
    )
}
