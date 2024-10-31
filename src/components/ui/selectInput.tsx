import { inputFormType } from "@/types/loginform.type";
import React from "react";

interface SelectInputProps extends inputFormType {
  options: string[];
  inputClassName?: string;
  labelClassName?: string;
  required?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function SelectInput({
  labelName,
  errors,
  register,
  name,
  defaultValue,
  registrationOption,
  enable,
  inputClassName,
  labelClassName,
  required,
  options,
  onChange,
}: SelectInputProps) {
  return (
    <div>
      <label className={`text-xs ${labelClassName}`}>
        {labelName}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <select
        className={`w-full border border-gray-400 px-3 py-[6px] mt-2 text-sm text-black rounded-md ${inputClassName}`}
        defaultValue={defaultValue}
        {...register(name, registrationOption)}
        disabled={enable}
        onChange={onChange}

      >
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      {errors[name] && (
        <p className="text-xs text-red-400 mt-1">{errors[name]?.message}</p>
      )}
    </div>
  );
}
