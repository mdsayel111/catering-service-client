import React from 'react'
import CheckBox from '../check-box/CheckBox'

export default function CheckBoxWithLabel({ label, checked, setChecked }) {
    return (
        <div className="mb-6 flex items-center gap-2">
            <CheckBox checked={checked} setChecked={setChecked} />
            <label htmlFor="subscribe" className="text-sm text-gray-700"
                dangerouslySetInnerHTML={{ __html: label }}
            ></label>
        </div>
    )
}
