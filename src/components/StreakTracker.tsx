// "use client";
// import { UserData } from "@/types/userdata.type";
// import { useState } from "react";

// export default function StreakTracker({ member }: { member: UserData }) {
//   const [streak, setStreak] = useState(member.streak);
//   const [lastAttendance, setLastAttendance] = useState(
//     member.lastAttendance ? new Date(member.lastAttendance) : null
//   );

//   const handleStreak = async (
//     currentStreak: number,
//     memberId: number | undefined
//   ) => {
//     const now = new Date();
//     let newStreak = 1;

//     if (lastAttendance) {
//       const lastAttendanceDate = new Date(lastAttendance);
//       const timeDifference = now.getTime() - lastAttendanceDate.getTime();
//       const hourDifference = Math.floor(timeDifference / (1000 * 60 * 60));
      
//       console.log(hourDifference)

//       if (hourDifference >= 24) {
//         newStreak = 0;
//       } else {
//         newStreak = currentStreak + 1;
//       }
//     }

//     try {
//       const response = await fetch(`http://localhost:2000/users/${memberId}`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           streak: newStreak,
//           lastAttendance: now.toISOString(),
//         }),
//       });

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       const updatedUser = await response.json();
//       setStreak(newStreak);
//       setLastAttendance(now);
//       console.log("Updated user:", updatedUser);
//     } catch (error) {
//       console.error("There was an error updating the user!", error);
//     }
//   };

//   return (
//     <div className="flex justify-between px-10">
//       <button
//         className="border border-red-400 px-4 py-2 mt-3 rounded-lg"
//         onClick={() => handleStreak(streak, member.id)}
//       >
//         Mark Attendance
//       </button>
//       <p className="mt-5">Your GYM STREAK: {streak} 🔥</p>
//     </div>
//   );
// }
