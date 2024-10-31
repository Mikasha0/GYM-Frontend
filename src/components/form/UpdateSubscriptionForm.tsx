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
import { toast } from "sonner";

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
      category:memberDetails.category,
      paymentMethod:memberDetails.paymentMethod,
      joindate: new Date(memberDetails.joindate).toISOString().split("T")[0],
      end_date:
        memberDetails.designation === "Trial-Member" && memberDetails.end_date
          ? new Date(memberDetails.end_date).toISOString().split("T")[0]
          : undefined,
      enddate:
        memberDetails.designation === "Member"
          ? memberDetails.enddate
          : undefined,
      paymentStatus: memberDetails.paymentStatus,
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof updateSubscriptionSchema>) => {
      const response = await fetch(
        `https://haster-gym-server.onrender.com/users/${memberDetails.id}`,
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
        end_date:
          memberDetails.designation === "Non-Member"
            ? new Date(subscriptionData.end_date).toISOString().split("T")[0]
            : undefined,
        enddate:
          memberDetails.designation === "Member"
            ? subscriptionData.enddate
            : "",
      });
      setDisplay(!display);
      setEnableInput(!enableInput);
      toast.success("Subscription updated successfully!");
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
              <SelectInput
                labelName="Category"
                errors={errors}
                register={register}
                labelClassName="text-gray-400 font-light ml-[10px]"
                inputClassName={`font-semibold text-xs ${
                  display ? "" : "border-none"
                }`}
                name="category"
                options={["Gym", "Cardio", "Gym + Cardio"]}
                enable={enableInput}
              />
              <SelectInput
                labelName="Payment Method"
                errors={errors}
                register={register}
                labelClassName="text-gray-400 font-light ml-[10px]"
                inputClassName={`font-semibold text-xs ${
                  display ? "" : "border-none"
                }`}
                name="paymentMethod"
                options={["Cash", "Esewa", "Khalti"]}
                enable={enableInput}
              />
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
              {memberDetails.designation === "Trial-Member" ? (
                <InputForm
                  labelName="End Date"
                  inputType="date"
                  register={register}
                  name="end_date"
                  registrationOption={{ valueAsDate: true }}
                  labelClassName="text-gray-400 font-light ml-[10px]"
                  inputClassName={`font-semibold text-xs ${
                    display ? "" : "border-none"
                  }`}
                  errors={errors}
                  enable={enableInput}
                />
              ) : memberDetails.designation === "Member" ? (
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
              ) : null}

              <SelectInput
                labelName="Payment Status"
                errors={errors}
                register={register}
                labelClassName="text-gray-400 font-light ml-[10px]"
                inputClassName={`font-semibold text-xs ${
                  display ? "" : "border-none"
                }`}
                name="paymentStatus"
                options={["Settled", "Pending", "Overdue"]}
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
              className="px-3 py-1 border border-gray-400 bg-[#8671D4] rounded-sm flex text-xs mt-3 text-white"
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
