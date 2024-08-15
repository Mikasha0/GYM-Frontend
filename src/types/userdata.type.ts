import { z } from "zod";
import { category, convertToEnum, designation, gender, paymentMethod } from "./z.schema.types";
const genderEnum = convertToEnum(gender, "gender")
type gender = z.infer<typeof genderEnum>
const designationEnum = convertToEnum(designation, "designation")
type designation = z.infer<typeof designationEnum>

const categoryEnum = convertToEnum(category, "Category");
type category = z.infer<typeof categoryEnum>
const paymentMethodEnum = convertToEnum(paymentMethod, "Payment Method");
type paymentMethod = z.infer<typeof paymentMethodEnum>
export type UserData = {
  id?: number;
  firstname: string;
  middlename?:string | null;
  lastname: string;
  email: string;
  phone: string;
  address:string;
  dateOfBirth: Date  | number | string;
  gender:gender;
  designation:designation;
  emergencyContactNumber: string;
  emergencyContactName:string;
  joindate: Date | string | number;
  end_date:string | Date | number ;
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
  lastAttendance?: Date | null;
  category:category,
  paymentMethod:paymentMethod
  profile:string
};
