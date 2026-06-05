import React from "react";

export default function RadioInput({ checked, onChange }) {
  return (
    <input
      type="radio"
      className="accent-black cursor-pointer"
      onChange={onChange}
      checked={checked}
    />
  );
}
