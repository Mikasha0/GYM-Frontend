"use client";
import { createUserSchema } from "@/types/z.schema.types";
import { steps } from "@/utils/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormSteps from "../ui/formSteps";
import InputForm from "../ui/inputForm";
import SelectInput from "../ui/selectInput";
import { AvatarGenerator } from "random-avatar-generator";
import Loading from "../ui/loading";

export default function RegisterUserForm() {
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [users, setUsers] = useState<(typeof createUserSchema)[]>([]);
  const delta = currentStep - previousStep;
  const generator = new AvatarGenerator();
  const ramdom_avatar = generator.generateRandomAvatar();

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

  const registerUser = async (data: z.infer<typeof createUserSchema>) => {
    const registerUserData = {
      ...data,
      streak: 0,
      lastattendance: null,
      profile: ramdom_avatar,
    };

    try {
      const response = await fetch("http://localhost:2000/users", {
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

  return (
    <>
      <FormSteps currentStep={currentStep} />
      <form
        onSubmit={handleSubmit(registerUser)}
        encType="multipart/form-data"
        className="mt-3"
      >
        <div className=" border border-gray-300 p-6 rounded-lg mt-1">
          {currentStep === 0 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h2 className="text-sm font-semibold">User Details</h2>
              <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
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
              <h2 className="text-sm font-semibold">Body Metrics</h2>
              <div className="mt-2 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
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
              <h2 className="text-sm font-semibold">Subscription</h2>
              <div className="mt-2 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                <InputForm
                  labelName="Join Date"
                  inputType="date"
                  register={register}
                  registrationOption={{ valueAsDate: true }}
                  name="joindate"
                  errors={errors}
                />
                <SelectInput
                  labelName="Subscription"
                  errors={errors}
                  register={register}
                  name="enddate"
                  options={["1 Month", "2 Month", "3 Month"]}
                />
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
                  options={["Pending", "Settled"]}
                />
              </div>
              <button
                type="submit" disabled={isSubmitting}
                className="font-light mt-6 px-10 py-1 bg-black text-white rounded-lg text-sm mr-3 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting && (<Loading loadingText="Registering..."/>)}
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
          className="font-light mt-6 px-10 py-1 bg-[#1400FF] text-white rounded-lg text-sm disabled:cursor-not-allowed disabled:opacity-50"
          disabled={currentStep === steps.length - 1}
          onClick={next}
        >
          Next
        </button>
      </div>
    </>
  );
}
