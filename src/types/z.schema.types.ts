import { z, ZodType } from "zod";
import { LoginData } from "./logindata.type";

// Login Schema
export const loginSchema: ZodType<LoginData> = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." }),
  password: z
    .string()
    .min(2, { message: "Password must be at least 2 characters." }),
});

const validateDateOfBirth = (date: Date) => {
  const today = new Date();
  return date < today;
};

export const gender = ["Male", "Female", "Other"];
export const bloodGroup = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
export const subscription = ["1 Month", "2 Month", "3 Month"];
export const paymentStatus = ["Pending", "Settled", "Overdue"];
export const new_gender = ["Inclusive", "Male", "Female", "Other"];
export const designation = ["Member", "Trial-Member"];
export const category = ["Gym", "Cardio", "Gym + Cardio"];
export const paymentMethod = ["Cash", "Esewa", "Khalti"];
export const convertToEnum = (data: string[], name: string) => {
  if (data.length === 0) {
    throw new Error("Array cannot be empty");
  }
  return z.enum(data as [string, ...string[]], {
    required_error: `${name} is required`,
    invalid_type_error: `Invalid ${name} value`,
  });
};

const convertDateToStr = (name: string) => {
  return z.preprocess(
    (arg) => {
      if (typeof arg == "string" || arg instanceof Date) {
        const date = new Date(arg);
        const utcDate = new Date(
          Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
        );
        return utcDate;
      }
    },
    z
      .date({
        required_error: `${name} is required`,
        invalid_type_error: `Invalid ${name}} format`,
      })
      .transform((date) => date.toISOString().split("T")[0])
  );
};
const dateOfBirthSchema = z.preprocess(
  (arg) => {
    if (arg === null) return null;
    if (
      typeof arg === "object" &&
      arg instanceof Date &&
      !isNaN(arg.getTime())
    ) {
      const date = new Date(arg);

      const utcDate = new Date(
        Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
      );
      return utcDate;
    }
    return null;
  },
  z

    .date({
      invalid_type_error: "Invalid date format",
    })
    .refine(validateDateOfBirth, {
      message: "Date of birth must be in the past",
    })
    .transform((date) => date.toISOString().split("T")[0])
);
export const createUserSchema = z
  .object({
    firstname: z
      .string()
      .min(2, { message: "First name must be at least 2 characters." }),
    middlename: z
      .string()
      // .min(2, { message: "Middle name must be at least 2 characters." })
      .nullable()
      .optional(),
    lastname: z
      .string()
      .min(2, { message: "Last name must be at least 2 characters." }),
    email: z.string().email({ message: "Invalid email address." }),
    phone: z.string().regex(/^9\d{9}$/, {
      message:
        "Phone number must be a valid 10-digit Nepalese number starting with 9.",
    }),
    address: z
      .string()
      .min(2, { message: "Address must be at least 2 characters." }),
    emergencyContactNumber: z
      .string()
      .regex(/^9\d{9}$/, {
        message:
          "Phone number must be a valid 10-digit Nepalese number starting with 9.",
      })
      .optional()
      .or(z.literal("")),
    emergencyContactName: z
      .string()
      .min(2, { message: "Contact name must be at least 2 characters." })
      .optional()
      .or(z.literal("")),
    dateOfBirth: dateOfBirthSchema,
    gender: convertToEnum(gender, "gender"),
    designation: convertToEnum(designation, "designation"),
    joindate: convertDateToStr("Join date"),
    end_date: convertDateToStr("End date").optional(),
    enddate: convertToEnum(subscription, "Subscription").optional(),
    height: z.number().min(0, { message: "Height must be a positive number." }),
    weight: z.number().min(0, { message: "Weight must be a positive number." }),
    hips: z.number().min(0, { message: "Hips must be a positive number." }),
    chest: z.number().min(0, { message: "Chest must be a positive number." }),
    waist: z.number().min(0, { message: "Waist must be a positive number." }),
    thigh: z.number().min(0, { message: "Thigh must be a positive number." }),
    allergies: z
      .string()
      .min(2, { message: "Allergies must be at least 2 characters." })
      .optional()
      .or(z.literal("")),
    medicalCondition: z
      .string()
      .min(2, { message: "Medical Condition must be at least 2 characters." })
      .optional()
      .or(z.literal("")),
    bloodGroup: convertToEnum(bloodGroup, "Blood group"),
    paymentStatus: convertToEnum(paymentStatus, "Payment status"),
    category: convertToEnum(category, "Category"),
    paymentMethod: convertToEnum(paymentMethod, "Payment Method"),
  })
  .refine(
    (data) =>
      data.designation === "Trial-Member" ? data.end_date : data.enddate,
    {
      message:
        "Either subscription or end date must be provided based on the designation.",
      path: ["enddate", "subscription"],
    }
  );

export const updateUserDetailsSchema = z.object({
  firstname: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  middlename: z
    .string()
    .min(2, { message: "Middle name must be at least 2 characters." })
    .optional()
    .nullable(),
  lastname: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().regex(/^9\d{9}$/, {
    message:
      "Phone number must be a valid 10-digit Nepalese number starting with 9.",
  }),
  address: z
    .string()
    .min(2, { message: "Address must be at least 2 characters." }),
  emergencyContactNumber: z.string().regex(/^9\d{9}$/, {
    message:
      "Phone number must be a valid 10-digit Nepalese number starting with 9.",
  }),
  emergencyContactName: z
    .string()
    .min(2, { message: "Contact name must be at least 2 characters." }),
  dateOfBirth: dateOfBirthSchema,
  gender: convertToEnum(gender, "gender"),
  designation: convertToEnum(designation, "designation"),
});

export const updateBodyMetricsSchema = z.object({
  height: z.number().min(0, { message: "Height must be a positive number." }),
  weight: z.number().min(0, { message: "Weight must be a positive number." }),
  hips: z.number().min(0, { message: "Hips must be a positive number." }),
  chest: z.number().min(0, { message: "Chest must be a positive number." }),
  waist: z.number().min(0, { message: "Waist must be a positive number." }),
  thigh: z.number().min(0, { message: "Thigh must be a positive number." }),
  allergies: z
    .string()
    .min(2, { message: "Allergies must be at least 2 characters." }),
  medicalCondition: z
    .string()
    .min(2, { message: "Medical Condition must be at least 2 characters." }),
  bloodGroup: convertToEnum(bloodGroup, "Blood group"),
});

export const updateSubscriptionSchema = z.object({
  joindate: convertDateToStr("Join date"),
  enddate: convertToEnum(subscription, "Subscription").optional(),
  paymentStatus: convertToEnum(paymentStatus, "Payment status"),
  end_date: convertDateToStr("End date").optional(),
  category: convertToEnum(category, "Category"),
  paymentMethod: convertToEnum(paymentMethod, "Payment Method"),
});
// .refine((data) => data.enddate > data.joindate,
//   message: "End date must be after join date.",
//   path: ["enddate"],
// });

export const createTaskSchema = z.object({
  taskName: z.string().min(1, "Task Name is required"),
  priority: z.enum(["High", "Medium", "Low"], {
    required_error: "Priority is required",
  }),
  taskDescription: z.string().min(1, "Task Description is required"),
});

// const status = ["Stock", "Low_Stock", "Sold_Out"];

export const createProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number().positive("Price must be a positive number"),
  quantity: z.number().nonnegative("Quantity must be non-negative"),
  description: z.string().min(1, "Description is required"),
  profile: z
    .custom<FileList>((files) => files instanceof FileList && files.length > 0)
    .refine(
      (files) => files[0].size <= 5 * 1024 * 1024,
      "Max image size is 5MB"
    ),
});

export const editProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number().positive("Price must be a positive number"),
  quantity: z.number().nonnegative("Quantity must be non-negative"),
  profile: z
    .custom<FileList>(
      (files) => files instanceof FileList && files.length >= 0,
      {
        message: "Profile must be a non-empty FileList",
      }
    )
    .optional()
    .nullable(),
});

export const createChallengesSchema = z.object({
  name: z.string().min(1, "Name of challenge is required"),
  gender: convertToEnum(new_gender, "gender"),
  description: z.string().min(1, "Description is required"),
});

export const createUserEmailSchema = z.object({
  firstname: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  middlename: z
    .string()
    // .min(2, { message: "Middle name must be at least 2 characters." })
    .nullable()
    .optional(),
  lastname: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  message: z.string().min(1, "Email Message is required"),
});
