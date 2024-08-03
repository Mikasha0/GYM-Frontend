import { UserData } from "@/types/userdata.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { differenceInDays } from "date-fns";
import { useEffect } from "react";

const updatePaymentStatus = async (memberId: number|undefined) => {
  const response = await fetch(`http://localhost:2000/users/${memberId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ paymentStatus: "Overdue" }),
  });

  if (!response.ok) {
    throw new Error("Failed to update payment status");
  }

  return response.json();
};

export const SubscriptionExpiryRow = ({ member }: { member: UserData }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updatePaymentStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:["members"]});
    },
  });

  const findPassedDate = (joindate: string | number | Date) => {
    const currDate = new Date();
    const joinDate = new Date(joindate);
    return differenceInDays(currDate, joinDate);
  };

  const remainingDays =
    member.enddate === "3 Month"
      ? 90 - findPassedDate(member.joindate)
      : member.enddate === "2 Month"
      ? 60 - findPassedDate(member.joindate)
      : member.enddate === "1 Month"
      ? 30 - findPassedDate(member.joindate)
      : null;

  useEffect(() => {
    if (
      remainingDays !== null &&
      remainingDays < 0 &&
      member.paymentStatus !== "Overdue"
    ) {
      mutation.mutate(member.id);
    }
  }, [remainingDays, member.paymentStatus, member.id, mutation]);

  return (
    <td className={`px-5 py-4 text-xs font-normal text-black text-center ${member.paymentStatus =="Overdue"?"text-red-400":""}`}>
      {remainingDays}
    </td>
  );
};

export default SubscriptionExpiryRow;
