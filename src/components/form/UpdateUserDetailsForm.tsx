"use client";
import { UserData } from "@/types/userdata.type";
import { updateUserDetailsSchema } from "@/types/z.schema.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaAngleDown } from "react-icons/fa6";
import { FiEdit2 } from "react-icons/fi";
import { MdSystemUpdateAlt } from "react-icons/md";
import { z } from "zod";
import InputForm from "../ui/inputForm";
import SelectInput from "../ui/selectInput";

export default function UpdateUserDetailsForm({
  memberDetails,
  showItem,
  setShowIndex,
}: {
  memberDetails: UserData;
  showItem: boolean;
  setShowIndex: () => void;
}) {
  const [display, setDisplay] = useState<boolean>(false);
  const [enableInput, setEnableInput] = useState<boolean>(true);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof updateUserDetailsSchema>>({
    resolver: zodResolver(updateUserDetailsSchema),
    mode: "onChange",
    defaultValues:{
      firstname:memberDetails.firstname,
      middlename:memberDetails?.middlename,
      lastname:memberDetails.lastname,
      email:memberDetails.email,
      phone:memberDetails.phone,
      address:memberDetails.address,
      gender:memberDetails.gender,
      dateOfBirth: new Date(memberDetails?.dateOfBirth).toISOString().split("T")[0]  ,
      emergencyContactName:memberDetails.emergencyContactName,
      emergencyContactNumber:memberDetails.emergencyContactNumber
    }
  });
  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof updateUserDetailsSchema>) => {
      const response = await fetch(
        `http://localhost:2000/users/${memberDetails.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user details");
      }

      return response.json();
    },
    onSuccess: (updatedData) => {
      queryClient.invalidateQueries({ queryKey: ["member", memberDetails.id] });
      reset({
        ...updatedData,
        dateOfBirth: new Date(updatedData.dateOfBirth)
          .toISOString()
          .split("T")[0],
      });
      alert("User details updated successfully");
    },
    onError: () => {
      alert("Failed to update user details");
    },
  });

  const showHideUpdateBtn = () => {
    if (display) {
      reset();
      setDisplay(!display);
      setEnableInput(!enableInput);
    } else {
      setDisplay(!display);
      setEnableInput(!enableInput);
    }
  };
  const handleClick = () => {
    setShowIndex();
    reset()
  };
  return (
    <form onSubmit={handleSubmit((data) => mutation.mutate(data))}>
      <div
        className="flex justify-between cursor-pointer"
        onClick={handleClick}
      >
        <h1 className="font-semibold text-sm">User Details</h1>
        <span>
          <FaAngleDown />
        </span>
      </div>
      {showItem == true ? (
        <>
          <div className="mt-1 flex">
            <div className="w-8/12 grid grid-cols-3 gap-2">
              <InputForm
                labelName="Firstname"
                labelClassName="text-gray-400 font-light ml-[10px]"
                inputType="text"
                register={register}
                inputClassName={`font-semibold text-xs ${
                  display ? "" : "border-none"
                }`}
                name="firstname"
                errors={errors}
                enable={enableInput}
              />
              <InputForm
                labelName="Middlename"
                labelClassName="text-gray-400 font-light ml-[10px]"
                inputType="text"
                register={register}
                inputClassName={`font-semibold text-xs ${
                  display ? "" : "border-none"
                }`}
                name="middlename"
                errors={errors}
                enable={enableInput}
              />
              <InputForm
                labelName="Lastname"
                inputType="text"
                labelClassName="text-gray-400 font-light ml-[10px]"
                inputClassName={`font-semibold text-xs ${
                  display ? "" : "border-none"
                }`}
                register={register}
                name="lastname"
                errors={errors}
                enable={enableInput}
              />
              <InputForm
                labelName="E-mail :"
                inputType="text"
                labelClassName="text-gray-400 font-light ml-[10px]"
                inputClassName={`font-semibold text-xs ${
                  display ? "" : "border-none"
                }`}
                register={register}
                name="email"
                errors={errors}
                enable={enableInput}
              />
              <InputForm
                labelName="Phone Number"
                inputType="number"
                labelClassName="text-gray-400 font-light ml-[10px]"
                inputClassName={`font-semibold text-xs ${
                  display ? "" : "border-none"
                }`}
                register={register}
                name="phone"
                errors={errors}
                enable={enableInput}
              />
              <InputForm
                labelName="Address"
                labelClassName="text-gray-400 font-light ml-[10px]"
                inputType="text"
                register={register}
                inputClassName={`font-semibold text-xs ${
                  display ? "" : "border-none"
                }`}
                name="address"
                errors={errors}
                enable={enableInput}
              />
              <SelectInput
                labelName="Gender"
                errors={errors}
                register={register}
                labelClassName="text-gray-400 font-light ml-[10px]"
                inputClassName={`font-semibold text-xs ${
                  display ? "" : "border-none"
                }`}
                name="gender"
                options={["Male", "Female", "Other"]}
                enable={enableInput}
              />
              <InputForm
                labelName="Date of Birth"
                inputType="date"
                register={register}
                name="dateOfBirth"
                registrationOption={{ valueAsDate: true }}
                labelClassName="text-gray-400 font-light ml-[10px]"
                inputClassName={`font-semibold text-xs ${
                  display ? "" : "border-none"
                }`}
                errors={errors}
                enable={enableInput}
              />
              <InputForm
                labelName="Emergency Contact Name"
                labelClassName="text-gray-400 font-light ml-[10px]"
                inputType="text"
                register={register}
                inputClassName={`font-semibold text-xs ${
                  display ? "" : "border-none"
                }`}
                name="emergencyContactName"
                errors={errors}
                enable={enableInput}
              />
              <InputForm
                labelName="Emergency Contact Number"
                inputType="number"
                labelClassName="text-gray-400 font-light ml-[10px]"
                inputClassName={`font-semibold text-xs ${
                  display ? "" : "border-none"
                }`}
                register={register}
                name="emergencyContactNumber"
                errors={errors}
                enable={enableInput}
              />
            </div>
            <div className="w-4/12 ">
              <div className="flex justify-end">
                <button
                  className="px-3 py-1 border border-gray-400 bg-white rounded-sm flex text-xs justify-end"
                  type="button"
                  onClick={showHideUpdateBtn}
                >
                  {display ? (
                    "Cancel"
                  ) : (
                    <>
                      <FiEdit2 size={10} className="mt-[2px] mr-1" /> Edit
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
          {display && (
            <button
              className="px-3 py-1 border border-gray-400 bg-[#A75815] rounded-sm flex text-xs mt-3 text-white"
              type="submit"
            >
              <MdSystemUpdateAlt className="mt-[1px] mr-1" />
              Update
            </button>
          )}
        </>
      ) : null}
    </form>
  );
}
