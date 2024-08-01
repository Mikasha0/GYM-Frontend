"use client";
import { UserData } from "@/types/userdata.type";
import { updateBodyMetricsSchema } from "@/types/z.schema.types";
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

export default function UpdateBodyMetricsForm({
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

  const { register, handleSubmit, formState: { errors }, reset } = useForm<z.infer<typeof updateBodyMetricsSchema>>({
    resolver: zodResolver(updateBodyMetricsSchema),
    mode: "onChange",
    defaultValues: {
      ...memberDetails,
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof updateBodyMetricsSchema>) => {
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
        throw new Error("Failed to update body metrics");
      }

      return response.json();
    },
    onSuccess: (updatedData) => {
      queryClient.invalidateQueries({ queryKey: ["member", memberDetails.id] });
      reset(updatedData);
      alert("Body Metrics updated successfully");
    },
    onError: () => {
      alert("Failed to update body metrics");
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
    reset();
  };

  return (
    <form onSubmit={handleSubmit((data) => mutation.mutate(data))}>
      <div className="flex justify-between cursor-pointer" onClick={handleClick}>
        <h1 className="font-semibold text-sm">Body Metrics</h1>
        <span>
          <FaAngleDown />
        </span>
      </div>
      {showItem && (
        <>
          <div className="flex mt-1">
            <div className="w-8/12 grid grid-cols-5 gap-3">
              <InputForm
                labelName="Height"
                inputType="number"
                labelClassName="text-gray-400 font-light ml-[10px]"
                inputClassName={`font-semibold text-xs ${display ? "" : "border-none"}`}
                register={register}
                registrationOption={{ valueAsNumber: true }}
                name="height"
                errors={errors}
                enable={enableInput}
              />
              <InputForm
                labelName="Weight"
                inputType="number"
                labelClassName="text-gray-400 font-light ml-[10px]"
                inputClassName={`font-semibold text-xs ${display ? "" : "border-none"}`}
                register={register}
                registrationOption={{ valueAsNumber: true }}
                name="weight"
                errors={errors}
                enable={enableInput}
              />
              <InputForm
                labelName="Hips"
                inputType="number"
                labelClassName="text-gray-400 font-light ml-[10px]"
                inputClassName={`font-semibold text-xs ${display ? "" : "border-none"}`}
                register={register}
                registrationOption={{ valueAsNumber: true }}
                name="hips"
                errors={errors}
                enable={enableInput}
              />
              <InputForm
                labelName="Chest"
                inputType="number"
                labelClassName="text-gray-400 font-light ml-[10px]"
                inputClassName={`font-semibold text-xs ${display ? "" : "border-none"}`}
                register={register}
                registrationOption={{ valueAsNumber: true }}
                name="chest"
                errors={errors}
                enable={enableInput}
              />
              <InputForm
                labelName="Waist"
                inputType="number"
                labelClassName="text-gray-400 font-light ml-[10px]"
                inputClassName={`font-semibold text-xs ${display ? "" : "border-none"}`}
                register={register}
                registrationOption={{ valueAsNumber: true }}
                name="waist"
                errors={errors}
                enable={enableInput}
              />
              <InputForm
                labelName="Thigh"
                inputType="number"
                labelClassName="text-gray-400 font-light ml-[10px]"
                inputClassName={`font-semibold text-xs ${display ? "" : "border-none"}`}
                register={register}
                registrationOption={{ valueAsNumber: true }}
                name="thigh"
                errors={errors}
                enable={enableInput}
              />
              <SelectInput
                labelName="Blood Group"
                errors={errors}
                register={register}
                labelClassName="text-gray-400 font-light ml-[10px]"
                inputClassName={`font-semibold text-xs ${display ? "" : "border-none"}`}
                name="bloodGroup"
                options={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]}
                enable={enableInput}
              />
              <InputForm
                labelName="Allergies"
                labelClassName="text-gray-400 font-light ml-[10px]"
                inputType="text"
                register={register}
                inputClassName={`font-semibold text-xs ${display ? "" : "border-none"}`}
                name="allergies"
                errors={errors}
                enable={enableInput}
              />
              <InputForm
                labelName="Medical Condition"
                labelClassName="text-gray-400 font-light ml-[10px]"
                inputType="text"
                register={register}
                inputClassName={`font-semibold text-xs ${display ? "" : "border-none"}`}
                name="medicalCondition"
                errors={errors}
                enable={enableInput}
              />
            </div>
            <div className="w-4/12">
              <div className="flex justify-end">
                <button
                  className="px-3 py-1 border border-gray-400 bg-white rounded-sm flex text-xs justify-end"
                  type="button"
                  onClick={showHideUpdateBtn}
                >
                  {display ? "Cancel" : (
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
              <MdSystemUpdateAlt className="mt-[1px] mr-1" /> Update
            </button>
          )}
        </>
      )}
    </form>
  );
}
