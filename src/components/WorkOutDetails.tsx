"use client";

import { UserData } from "@/types/userdata.type";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

export async function getWorkOutPlanById(
  memberId: number | undefined
): Promise<any> {
  const res = await fetch(`http://localhost:2000/workouts?userId=${memberId}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch workout plan details");
  }
  return res.json();
}
export default function WorkOutDetails({member}:{member:UserData}) {

    const {
        data: workoutPlan,
        isLoading: isWorkoutLoading,
        isError: isWorkoutError,
      }: UseQueryResult<any, Error> = useQuery({
        queryKey: ["workoutPlan", member.id],
        queryFn: () => getWorkOutPlanById(member.id),
      });
    
      if ( isWorkoutLoading) {
        return <div>Loading...</div>;
      }
    
      if (isWorkoutError || !member) {
        return <div>Error fetching member or workout plan details</div>;
      }
  return (
    <div>
      {workoutPlan.map((exercise: any) => (
        <p key={exercise.id}>{exercise.bodyPart}</p>
      ))}
    </div>
  );
}
