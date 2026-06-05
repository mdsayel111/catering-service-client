import TextInput from "@/components/shared/inputs/text-input/TextInput";
import React from "react";

export default function AuthTextInput({
  value,
  setValue,
  label,
  placeholder,
  isRequired = false,
  type = "text",
  isNumber = false,
}) {
  return (
    <TextInput
      type={type}
      labelClass={"text-sm"}
      inputClass={"text-sm shadow-none"}
      label={`${label} ${isRequired && "<span style=color:red>*</span>"}`}
      placeholder={placeholder}
      value={value}
      setValue={(val) => {
        if (isNumber) {
          // keep only digits
          const onlyNumbers = val.replace(/\D/g, "");

          // limit to 11 digits
          if (onlyNumbers.length <= 11) {
            setValue(onlyNumbers);
          }
        } else {
          setValue(val);
        }
      }}
    />
  );
}
