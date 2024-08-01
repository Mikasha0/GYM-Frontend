import { inputFormType } from "@/types/loginform.type";
import React from "react";

interface TextareaFormType extends inputFormType {
  inputName?: string;
  inputClassName?: string;
  labelClassName?: string;
  required?: boolean;
}

export default function TextareaForm({
  labelName,
  inputName,
  placeholder,
  errors,
  register,
  name,
  defaultValue,
  registrationOption,
  enable,
  inputClassName,
  labelClassName,
  required,
}: TextareaFormType) {
  return (
    <div>
      <label className={`text-xs ${labelClassName}`}>
        {labelName}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <textarea
        id={inputName}
        className={`w-full border border-gray-400 px-3 py-1 mt-2 text-sm text-black rounded-lg ${inputClassName}`}
        placeholder={placeholder}
        defaultValue={defaultValue}
        {...register(name, registrationOption)}
        disabled={enable}
      />
      {errors[name] && (
        <p className="text-xs text-red-400 mt-1">{errors[name]?.message}</p>
      )}
    </div>
  );
}
