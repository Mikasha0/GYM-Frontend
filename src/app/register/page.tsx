"use client";
import InputForm from "@/components/ui/inputForm";
import RegisterFormSteps from "@/components/ui/registerFormStrps";
import { RegisterSchema } from "@/types/z.schema.types";
import { registerSteps } from "@/utils/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import { z } from "zod";
import { IoIosArrowBack } from "react-icons/io";
import Image from "next/image";

export default function Register() {
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    mode: "onChange",
    defaultValues: {
      status: "startingOut", // Default value for the radio button
    },
  });

  const registerUser = async (data: z.infer<typeof RegisterSchema>) => {
    console.log(data);
  };

  type FieldName = keyof z.infer<typeof RegisterSchema>;

  const next = async () => {
    const fields = registerSteps[currentStep].fields as FieldName[];
    const output = await trigger(fields, { shouldFocus: true });

    if (!output) return;

    if (currentStep < registerSteps.length - 1) {
      if (currentStep === registerSteps.length - 1) {
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
    <div
      className="w-full h-screen flex justify-center items-center"
      style={{
        background:
          "linear-gradient(90deg, #8C76DC 0%, #7255DD 49.5%, #4E27DF 100%)",
      }}
    >
      <div className="w-full max-w-[600px] flex flex-col px-6 py-8 bg-white border border-gray-200 shadow-xl rounded-lg">
        <div className="flex justify-between mb-4">
          <div className="flex items-center">
            <p className="bg-[#8671D4] w-7 h-7 rounded-full ml-1"></p>
            <h1 className="text-base font-medium ml-1">Haster Gym</h1>
          </div>
          <button onClick={() => router.push("/")}>
            <IoMdClose />
          </button>
        </div>

        <RegisterFormSteps currentStep={currentStep} />

        <form
          className="flex-grow mt-4"
          onSubmit={handleSubmit(registerUser)}
          encType="multipart/form-data"
        >
          {currentStep === 0 && (
            <div className="px-2">
              <h2>Let's get to know you before we get started.</h2>
              <h3 className="text-sm text-[#ABA5A5]">
                It will help us to set up your store.
              </h3>
              <div className="flex mt-6">
                <input
                  type="radio"
                  id="startingOut"
                  {...register("status")}
                  value="startingOut"
                  className="ml-2 bg-[#8671D4]"
                  defaultChecked
                />
                <label htmlFor="startingOut" className="ml-2 text-sm">
                  I'm Just Starting Out
                </label>
              </div>
              <div className="flex mt-3">
                <input
                  type="radio"
                  id="alreadyOnInstagram"
                  {...register("status")}
                  value="alreadyOnInstagram"
                  className="ml-2 bg-[#8671D4]"
                />
                <label htmlFor="alreadyOnInstagram" className="ml-2 text-sm">
                  I'm already on Instagram.
                </label>
              </div>
            </div>
          )}
          {currentStep === 1 && (
            <div className="px-2">
              <h2>What would you like to name your Gym?</h2>
              <h3 className="text-sm text-[#ABA5A5]">
                You can always change this later on.
              </h3>
              <div className="w-full mt-2">
                <InputForm
                  labelName="Your gym name"
                  labelClassName="text-xs font-medium"
                  inputType="text"
                  register={register}
                  registrationOption={{}}
                  name="gymName"
                  errors={errors}
                  required
                />
              </div>
            </div>
          )}
          {currentStep === 2 && (
            <div className="px-2">
              <h2>Little more about yourself</h2>
              <h3 className="text-sm text-[#ABA5A5]">
                It will be easier to reach you out.
              </h3>
              <div className="w-full mt-2 space-y-4">
                <InputForm
                  labelName="Your Full Name"
                  labelClassName="text-xs font-medium"
                  inputType="text"
                  register={register}
                  registrationOption={{}}
                  name="fullName"
                  errors={errors}
                  required
                />
                <InputForm
                  labelName="Phone Number"
                  labelClassName="text-xs font-medium"
                  inputType="number"
                  register={register}
                  registrationOption={{}}
                  name="phoneNumber"
                  errors={errors}
                  required
                />
              </div>
            </div>
          )}
          {currentStep === 3 && (
            <div className="px-2">
              <h2>Create your own Haster Gym account</h2>
              <h3 className="text-sm text-[#ABA5A5]">
                Link with your google account.
              </h3>
              <div className="w-full mt-2">
                <button
                  type="button"
                  className="mt-6 mb-10 w-full h-10 text-sm border border-gray-200 text-black font-semibold rounded-lg flex items-center justify-center"
                >
                  <Image
                    src={"/google.png"}
                    width={13}
                    height={13}
                    alt="gmail"
                    className="mr-3"
                  />
                  Continue with Google
                </button>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="w-[123px] h-[34px] text-xs text-white bg-[#8671D4] font-extrabold rounded"
                >
                  Finish
                </button>
              </div>
            </div>
          )}
        </form>
        <div
          className={`flex ${
            currentStep == 0 ? "justify-end" : "justify-between"
          } mt-6 space-x-4`}
        >
          {currentStep > 0 && (
            <button
              type="button"
              className="w-[123px] h-[34px] text-xs text-black rounded flex items-center"
              onClick={prev}
            >
              <IoIosArrowBack size={16} className="font-light" /> &nbsp; Back
            </button>
          )}
          {currentStep !== registerSteps.length - 1 && (
            <button
              type="button"
              className="w-[123px] h-[34px] text-xs text-white bg-[#8671D4] font-extrabold rounded"
              onClick={next}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
