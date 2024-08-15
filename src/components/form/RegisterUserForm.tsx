"use client";
import { createUserSchema } from "@/types/z.schema.types";
import { steps } from "@/utils/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { AvatarGenerator } from "random-avatar-generator";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaCheck } from "react-icons/fa6";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import AddOns, { addOnsPrice } from "../AddOns";
import FormSteps from "../ui/formSteps";
import InputForm from "../ui/inputForm";
import Loading from "../ui/loading";
import SelectInput from "../ui/selectInput";

export const Pricing: { [key: string]: number } = {
  Gym: 1000,
  Cardio: 800,
  "Gym + Cardio": 1500,
};

export const Subscription: { [key: string]: number } = {
  "1 Month": 1,
  "2 Month": 2,
  "3 Month": 3,
};

export default function RegisterUserForm() {
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [designation, setDesignation] = useState<string>("Member");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [category, setCategory] = useState("Gym");
  const [subscription, setSubscription] = useState("1 Month");
  const [users, setUsers] = useState<(typeof createUserSchema)[]>([]);
  const delta = currentStep - previousStep;
  const generator = new AvatarGenerator();
  const ramdom_avatar = generator.generateRandomAvatar();
  console.log(designation)
  const AddOn = selectedAddOns.reduce(
    (total, addOn) => total + addOnsPrice[addOn],
    0
  );

  const router = useRouter();

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof createUserSchema>>({
    resolver: zodResolver(createUserSchema),
    mode: "onChange",
  });

  const handleAddOnClick = (value: string) => {
    setSelectedAddOns((addons) =>
      addons.includes(value)
        ? addons.filter((addOn) => addOn !== value)
        : [...addons, value]
    );
  };

  const registerUser = async (data: z.infer<typeof createUserSchema>) => {
    console.log(data);
    const registerUserData = {
      ...data,
      addOns: selectedAddOns,
      id: uuidv4(),
      streak: 0,
      lastattendance: null,
      profile: ramdom_avatar,
    };

    try {
      const response = await fetch("https://haster-gym-server.onrender.com/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerUserData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setUsers((prevUsers) => [...prevUsers, result]);
      router.push("/dashboard/members");
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  type FieldName = keyof z.infer<typeof createUserSchema>;

  const next = async () => {
    const fields = steps[currentStep].fields as FieldName[];
    const output = await trigger(fields, { shouldFocus: true });

    if (!output) return;

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 1) {
        await handleSubmit(registerUser)();
      }
      setPreviousStep(currentStep);
      setCurrentStep((step) => step + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };

  const categoryTimesSubscription =
    Pricing[category] * Subscription[subscription];

  return (
    <>
      <FormSteps currentStep={currentStep} />
      <form
        onSubmit={handleSubmit(registerUser)}
        encType="multipart/form-data"
        className="mt-3"
      >
        <div className="border border-gray-300 p-5 rounded-lg">
          {currentStep === 0 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                <InputForm
                  labelName="First Name"
                  inputType="text"
                  register={register}
                  name="firstname"
                  errors={errors}
                  required={true}
                />
                <InputForm
                  labelName="Middle Name"
                  inputType="text"
                  register={register}
                  name="middlename"
                  errors={errors}
                />
                <InputForm
                  labelName="Last Name"
                  inputType="text"
                  register={register}
                  name="lastname"
                  errors={errors}
                  required={true}
                />
                <InputForm
                  labelName="E-mail"
                  inputType="text"
                  register={register}
                  name="email"
                  errors={errors}
                  required={true}
                />
              </div>
              <div className="mt-2 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                <InputForm
                  labelName="Phone Number"
                  inputType="number"
                  register={register}
                  name="phone"
                  errors={errors}
                  required={true}
                />
                <InputForm
                  labelName="Date of Birth"
                  inputType="date"
                  register={register}
                  registrationOption={{ valueAsDate: true }}
                  name="dateOfBirth"
                  errors={errors}
                  required={true}
                />
                <SelectInput
                  labelName="Gender"
                  errors={errors}
                  register={register}
                  name="gender"
                  options={["Male", "Female", "Other"]}
                  required={true}
                />
                <InputForm
                  labelName="Address"
                  inputType="text"
                  register={register}
                  name="address"
                  errors={errors}
                  required={true}
                />
                <SelectInput
                  labelName="Designation"
                  errors={errors}
                  register={register}
                  name="designation"
                  options={["Member", "Trial-Member"]}
                  required={true}
                  onChange={(e) => setDesignation(e.target.value)}
                />
              </div>
              <hr className="w-full mt-6  border-t-[1.4px] border-gray-300" />
              <div className="mt-2 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
                <InputForm
                  labelName="Emergency Contact Name"
                  inputType="text"
                  register={register}
                  name="emergencyContactName"
                  errors={errors}
                />
                <InputForm
                  labelName="Emergency Contact Number"
                  inputType="number"
                  register={register}
                  name="emergencyContactNumber"
                  errors={errors}
                />
              </div>
            </motion.div>
          )}
          {currentStep === 1 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="mt-2 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                <InputForm
                  labelName="Height"
                  inputType="number"
                  register={register}
                  registrationOption={{ valueAsNumber: true }}
                  name="height"
                  errors={errors}
                />
                <InputForm
                  labelName="Weight"
                  inputType="number"
                  register={register}
                  registrationOption={{ valueAsNumber: true }}
                  name="weight"
                  errors={errors}
                />
                <InputForm
                  labelName="Hips"
                  inputType="number"
                  register={register}
                  registrationOption={{ valueAsNumber: true }}
                  name="hips"
                  errors={errors}
                />
                <InputForm
                  labelName="Chest"
                  inputType="number"
                  register={register}
                  registrationOption={{ valueAsNumber: true }}
                  name="chest"
                  errors={errors}
                />
                <InputForm
                  labelName="Waist"
                  inputType="number"
                  register={register}
                  registrationOption={{ valueAsNumber: true }}
                  name="waist"
                  errors={errors}
                />
                <InputForm
                  labelName="Thigh"
                  inputType="number"
                  register={register}
                  registrationOption={{ valueAsNumber: true }}
                  name="thigh"
                  errors={errors}
                />
                <SelectInput
                  labelName="Blood Group"
                  errors={errors}
                  register={register}
                  name="bloodGroup"
                  options={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]}
                />
              </div>
              <hr className="w-full mt-6  border-t-[1.4px] border-gray-300" />

              <div className="grid grid-cols-2 gap-3 mt-2">
                <InputForm
                  labelName="Allergies"
                  inputType="text"
                  register={register}
                  name="allergies"
                  errors={errors}
                />
                <InputForm
                  labelName="Medical Condition"
                  inputType="text"
                  register={register}
                  name="medicalCondition"
                  errors={errors}
                />
              </div>
            </motion.div>
          )}
          {currentStep === 2 && (
            <>
              <div className="mt-2 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
                <SelectInput
                  labelName="Category"
                  errors={errors}
                  register={register}
                  name="category"
                  options={["Gym", "Cardio", "Gym + Cardio"]}
                  onChange={(e) => setCategory(e.target.value)}
                />
                <SelectInput
                  labelName="Payment Method"
                  errors={errors}
                  register={register}
                  name="paymentMethod"
                  options={["Cash", "Esewa", "Khalti"]}
                />
                <InputForm
                  labelName="Join Date"
                  inputType="date"
                  register={register}
                  registrationOption={{ valueAsDate: true }}
                  name="joindate"
                  errors={errors}
                />
                {designation == "Trial-Member" ? (
                  <InputForm
                    labelName="End Date"
                    inputType="date"
                    register={register}
                    registrationOption={{ valueAsDate: true }}
                    name="end_date"
                    errors={errors}
                  />
                ) : (
                  <SelectInput
                    labelName="Subscription"
                    errors={errors}
                    register={register}
                    name="enddate"
                    options={["1 Month", "2 Month", "3 Month"]}
                    onChange={(e) => setSubscription(e.target.value)}
                  />
                )}

                {/* <InputForm
                  labelName="End Date"
                  inputType="date"
                  register={register}
                  registrationOption={{ valueAsDate: true }}
                  name="enddate"
                  errors={errors}
                /> */}
                <SelectInput
                  labelName="Payment Status"
                  errors={errors}
                  register={register}
                  name="paymentStatus"
                  options={["Pending", "Settled", "Overdue"]}
                />
              </div>
              <p className="mt-4 font-semibold text-xs">Add ons:</p>
              <div className="mt-2 flex ">
                <button
                  className={`flex text-xs font-semibold px-3 py-2 border-[1.4px] rounded-md mr-2 ${
                    selectedAddOns.includes("Shower")
                      ? "border-[#A75815] text-[#A75815]"
                      : "border-gray-300"
                  }`}
                  type="button"
                  value="Shower"
                  onClick={() => handleAddOnClick("Shower")}
                >
                  Shower{" "}
                  {selectedAddOns.includes("Shower") ? (
                    <FaCheck className="ml-2 mt-[2px]" />
                  ) : (
                    "+"
                  )}
                </button>
                <button
                  className={`flex text-xs font-semibold px-3 py-2 border-[1.4px] rounded-md mr-2 ${
                    selectedAddOns.includes("Locker")
                      ? "border-[#A75815] text-[#A75815]"
                      : "border-gray-300"
                  }`}
                  type="button"
                  value="Locker"
                  onClick={() => handleAddOnClick("Locker")}
                >
                  Locker
                  {selectedAddOns.includes("Locker") ? (
                    <FaCheck className="ml-2 mt-[2px]" />
                  ) : (
                    "+"
                  )}
                </button>
                <button
                  className={`flex text-xs font-semibold px-3 py-2 border-[1.4px] rounded-md mr-2 ${
                    selectedAddOns.includes("Sauna")
                      ? "border-[#A75815] text-[#A75815]"
                      : "border-gray-300"
                  }`}
                  type="button"
                  value="Sauna"
                  onClick={() => handleAddOnClick("Sauna")}
                >
                  Sauna
                  {selectedAddOns.includes("Sauna") ? (
                    <FaCheck className="ml-2 mt-[2px]" />
                  ) : (
                    "+"
                  )}
                </button>
                <button
                  className={`flex text-xs font-semibold px-3 py-2 border-[1.4px] rounded-md mr-2 ${
                    selectedAddOns.includes("Personal Training")
                      ? "border-[#A75815] text-[#A75815]"
                      : "border-gray-300"
                  }`}
                  type="button"
                  value="Personal Training"
                  onClick={() => handleAddOnClick("Personal Training")}
                >
                  Personal Training
                  {selectedAddOns.includes("Personal Training") ? (
                    <FaCheck className="ml-2 mt-[2px]" />
                  ) : (
                    "+"
                  )}
                </button>
              </div>
              <div className="flex mt-4 justify-between">
                <p className="text-xs font-semibold">{category}</p>
                <p className="text-xs">
                  Rs {Pricing[category] * Subscription[subscription]}
                </p>
              </div>
              {selectedAddOns.length != 0 &&
                selectedAddOns.map((addOns) => (
                  <AddOns addOns={addOns} key={addOns} />
                ))}
              <div className="flex justify-between mt-2">
                <p className="text-xs font-semibold">Total</p>
                <p className="text-xs font-semibold">
                  Rs {categoryTimesSubscription + AddOn}
                </p>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="font-light mt-6 px-10 py-1 bg-[#A75815] text-white rounded-lg text-sm mr-3 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting && <Loading loadingText="Registering..." />}
                Register
              </button>
            </>
          )}
        </div>
      </form>
      <div className="flex justify-end mt-2">
        <button
          type="button"
          className="font-light mt-6 px-10 py-1 bg-black text-white rounded-lg text-sm mr-3 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={currentStep === 0}
          onClick={prev}
        >
          Back
        </button>
        <button
          type="button"
          className="font-light mt-6 px-10 py-1 bg-[#A75815] text-white rounded-lg text-sm disabled:cursor-not-allowed disabled:opacity-50"
          disabled={currentStep === steps.length - 1}
          onClick={next}
        >
          Next
        </button>
      </div>
    </>
  );
}
