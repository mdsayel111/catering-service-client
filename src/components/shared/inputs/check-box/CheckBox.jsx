import React from 'react'

export default function CheckBox({ checked, setChecked }) {
    return (
        <input type="checkbox" className="accent-black" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
    )
}
