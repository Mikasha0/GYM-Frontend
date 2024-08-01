import { z } from "zod";
import { convertToEnum, gender } from "./z.schema.types";
const genderEnum = convertToEnum(gender, "gender")
type gender = z.infer<typeof genderEnum>

export type UserData = {
  id?: number;
  firstname: string;
  middlename?:string | null;
  lastname: string;
  email: string;
  phone: string;
  address:string;
  dateOfBirth: Date  | number | string;
  gender:gender,
  emergencyContactNumber: string;
  emergencyContactName:string;
  joindate: Date | string | number;
  enddate: string  ;
  height:number;
  weight:number;
  hips:number;
  chest:number;
  waist:number;
  thigh:number;
  allergies:string;
  medicalCondition:string;
  bloodGroup:string;
  paymentStatus:string;
  streak?:number;
  profile:string;
  lastAttendance?: Date | null;
};
