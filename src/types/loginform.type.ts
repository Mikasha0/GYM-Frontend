import { registrationOptionType } from "./registrationoptin.type";

export type inputFormType = {
    labelName?: string;
    placeholder?: string  | undefined | null;
    inputType?: string;
    errors: any;
    register: any;
    name:string;
    defaultValue?:string | null | number,
    registrationOption?:registrationOptionType,
    value?:string,
    enable?:Boolean
  };