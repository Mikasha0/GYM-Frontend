import { inputFormType } from "@/types/loginform.type";
import React from "react";

export default function InputForm({
  labelName,
  inputName,
  placeholder,
  inputType,
  errors,
  register,
  name,
  defaultValue,
  registrationOption,
  enable,
  inputClassName,
  labelClassName,
  value,
  required,
}: inputFormType & { inputName?: string; inputClassName?: string; labelClassName?: string; required?: boolean;}) {
  return (
    <div>
      <label className={`text-xs ${labelClassName}`}>
        {labelName}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <input
        type={inputType}
        id={inputName}
        className={`w-full border border-gray-400 px-3 py-1 mt-2 text-sm text-black rounded-md ${inputClassName}`}
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        {...register(name, registrationOption)}
        disabled={enable}
      />
          <style jsx>{`
        input::placeholder {
          color: ${enable ? 'black' : '#d3d3d3'};
        }
      `}</style>
      {errors[name] && (
        <p className="text-xs text-red-400 mt-1">{errors[name]?.message}</p>
      )}
    </div>
  );
}
