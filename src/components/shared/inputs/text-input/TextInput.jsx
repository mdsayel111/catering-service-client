import { cn } from "@/utils/cn";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function TextInput({
  label,
  placeholder,
  theme = "light",
  value,
  setValue,
  type = "text",
  variant,
  labelClass,
  inputClass,
  className,
  isNumber,
  disabled,
}) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className={cn("flex flex-col gap-2 relative", className)}>
      {label && (
        <label
          htmlFor="fname"
          className={cn(
            "text-[16px] max-sm:text-[14px]",
            variant === "small" && "text-sm",
            labelClass
          )}
          dangerouslySetInnerHTML={{ __html: label }}
        ></label>
      )}
      <input
        disabled={disabled}
        type={type === "password" && showPassword ? "text" : type}
        value={value}
        onChange={(e) => {
          if (isNumber) {
            setValue(e.target.value.replace(/[^0-9]/g, ""));
          } else {
            setValue(e.target.value);
          }
        }}
        name="fname"
        id="fname"
        placeholder={placeholder}
        className={cn(
          `w-full px-5 py-3 rounded-sm shadow-sm max-sm:text-sm placeholder:text-gray-600 text-black !border`,
          variant === "small" && "text-sm py-2",
          variant === "medium" && "py-2.5",
          inputClass,
          type === "password" && "pr-10"
        )}
      />
      {type === "password" && (
        <div
          onClick={() => setShowPassword(!showPassword)}
          className="absolute top-[42px] right-4 text-gray-400 cursor-pointer"
        >
          {showPassword ? <FaEye /> : <FaEyeSlash />}
        </div>
      )}
    </div>
  );
}
