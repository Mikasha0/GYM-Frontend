export const PROFILE_IMG =
  "https://avatars.githubusercontent.com/u/85796807?v=4";

export const steps = [
  {
    id: "1",
    name: "User Details",
    fields: [
      "firstname",
      "middlename",
      "lastname",
      "email",
      "phone",
      "dateOfBirth",
      "gender",
      "address",
      "designation",
      "emergencyContactNumber",
      "emergencyContactName",
    ],
  },
  {
    id: "2",
    name: "Body Metrics",
    fields: [
      "height",
      "weight",
      "hips",
      "chest",
      "waist",
      "thigh",
      "bloodGroup",
      "allergies",
      "medicalCondition",
    ],
  },
  {
    id: "3",
    name: "Subscription",
    fields: [
      "category",
      "paymentMethod",
      "joindate",
      "enddate",
      "end_date",
      "paymentStatus",
    ],
  },
];

export const registerSteps = [
  {
    fields: ["status"],
  },
  {
    fields: ["gymName"],
  },
  {
    fields: ["fullName", "phoneNumber"],
  },
  {
    fields: [],
  },
];
