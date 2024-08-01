"use client";
import { UserData } from "@/types/userdata.type";
import { updateSubscriptionSchema } from "@/types/z.schema.types";
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

export default function UpdateSubscriptionForm({
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
  } = useForm<z.infer<typeof updateSubscriptionSchema>>({
    resolver: zodResolver(updateSubscriptionSchema),
    mode: "onChange",
    defaultValues: {
      joindate: new Date(memberDetails.joindate).toISOString().split("T")[0],
      enddate: memberDetails.enddate,
      paymentStatus: memberDetails.paymentStatus,
    },
  });
  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof updateSubscriptionSchema>) => {
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
        throw new Error("Failed to update Subscription");
      }

      return response.json();
    },
    onSuccess: (subscriptionData) => {
      queryClient.invalidateQueries({ queryKey: ["member", memberDetails.id] });
      reset({
        ...subscriptionData,
        joindate: new Date(subscriptionData.joindate)
          .toISOString()
          .split("T")[0],
        enddate: new Date(subscriptionData.enddate).toISOString().split("T")[0],
      });
      alert("Subscription updated successfully");
    },
    onError: () => {
      alert("Failed to update Subscription");
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
      <div
        className="flex justify-between cursor-pointer"
        onClick={handleClick}
      >
        <h1 className="font-semibold text-sm">Subscription</h1>
        <span>
          <FaAngleDown />
        </span>
      </div>
      {showItem == true ? (
        <>
          <div className="flex mt-1">
            <div className="w-8/12 grid grid-cols-5 gap-3">
              <InputForm
                labelName="Join Date"
                inputType="date"
                register={register}
                name="joindate"
                registrationOption={{ valueAsDate: true }}
                labelClassName="text-gray-400 font-light ml-[10px]"
                inputClassName={`font-semibold text-xs ${
                  display ? "" : "border-none"
                }`}
                errors={errors}
                enable={enableInput}
              />
              {/* <InputForm
                labelName="End Date"
                inputType="date"
                register={register}
                name="enddate"
                registrationOption={{ valueAsDate: true }}
                labelClassName="text-gray-400 font-light ml-[10px]"
                inputClassName={`font-semibold text-xs  ${
                  display ? "" : "border-none"
                }`}
                errors={errors}
                enable={enableInput}
              /> */}
              <SelectInput
                labelName="Subscription"
                errors={errors}
                register={register}
                labelClassName="text-gray-400 font-light ml-[10px]"
                inputClassName={`font-semibold text-xs ${
                  display ? "" : "border-none"
                }`}
                name="enddate"
                options={["1 Month", "2 Month", "3 Month"]}
                enable={enableInput}
              />
              <SelectInput
                labelName="Payment Status"
                errors={errors}
                register={register}
                labelClassName="text-gray-400 font-light ml-[10px]"
                inputClassName={`font-semibold text-xs ${
                  display ? "" : "border-none"
                }`}
                name="paymentStatus"
                options={["Settled", "Pending"]}
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
