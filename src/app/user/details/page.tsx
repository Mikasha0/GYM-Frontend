// "use client";
// import { useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import { databases } from "@/lib/appwrite_client";
// import { Models, Query } from "appwrite";
// import UserDetailsStepper from "@/components/UserDetailsStepper";
// import Spinner from "@/components/ui/spinner";
// type UserDocument = Models.Document & {
//   name: string;
//   email: string;
// };
// export default function Details() {
//   const [steps, setSteps] = useState(1);
//   const [fitnessObj, setFitnessObj] = useState<string[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [userData, setUserData] = useState<UserDocument | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const searchParams = useSearchParams();
//   const email = searchParams.get("email");
//   const toggleSteps = () => {
//     setSteps(steps + 1);
//   };

//   const objectives = [
//     "Weight Loss",
//     "Muscle Gain",
//     "Increase Flexibility",
//     "Cardiovascular Endurance",
//   ];

//   const handleAddOnObjective = (objective: string) => {
//     if (!fitnessObj.includes(objective)) {
//       setFitnessObj((prev) => [...prev, objective]);
//     } else {
//       setFitnessObj((prev) => prev.filter((item) => item !== objective));
//     }
//   };

// useEffect(() => {
//   if (!email) {
//     setError("No email found in URL.");
//     setLoading(false);
//     return;
//   }

//   const fetchUserData = async () => {
//     try {
//       const usersCollectionId = "66f3d57b0008cd6db213";
//       const databaseId = "66c19c5d002a148ac20f";

//       const response = await databases.listDocuments<UserDocument>(
//         databaseId,
//         usersCollectionId,
//         [Query.equal("email", email)]
//       );

//       if (response.documents.length > 0) {
//         setUserData(response.documents[0]);
//       } else {
//         setError("User not found");
//       }
//     } catch (err) {
//       setError("An error occurred while fetching user data.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchUserData();
// }, [email]);


//   if (loading) {
//     return (
//       <div className="w-full h-screen bg-white rounded-2xl flex justify-center items-center ">
//         <Spinner />
//       </div>
//     );
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   console.log(userData);
//   return (
//     <div className="w-full h-screen flex flex-col items-center">
//       {steps == 1 && (
//         <>
//           <div className="w-[316px] sm:w-full mt-[62px] flex items-center flex-col">
//             <h1 className="text-[26px] font-semibold text-center">
//               A few details about you
//             </h1>
//             <div className="w-[281px]">
//               <p className="text-center mt-2 text-[15px]">
//                 We need this information to provide better support and services
//               </p>
//             </div>
//           </div>
//           <UserDetailsStepper data={userData} />
//           <div className="flex-grow"></div>
//           <div className="w-full flex justify-end px-[26px] pb-[31px]">
//             <button
//               className="bg-[#8671D4] text-white text-sm font-semibold rounded-md w-[160.5px] h-10"
//               onClick={toggleSteps}
//             >
//               Next
//             </button>
//           </div>
//         </>
//       )}
//       {steps == 2 && (
//         <>
//           <div className="w-[303px] sm:w-full mt-[196px] flex items-center flex-col">
//             <h1 className="text-[26px] font-semibold text-center">
//               Choose Your Fitness Objectives
//             </h1>
//             <div className="w-[219px]">
//               <p className="text-center mt-2 text-[15px]">
//                 Personalized Fitness Experience Just For You
//               </p>
//             </div>
//             <div className="mt-9">
//               {objectives.map((objective) => (
//                 <button
//                   key={objective}
//                   className={`flex text-xs items-center px-3 py-2 border-[1.4px] rounded-md w-[329px] h-10 mb-3 ${
//                     fitnessObj.includes(objective)
//                       ? "bg-gray-400 text-white"
//                       : "bg-[#dfdfdf]"
//                   }`}
//                   type="button"
//                   onClick={() => handleAddOnObjective(objective)}
//                 >
//                   {objective}
//                 </button>
//               ))}
//             </div>
//           </div>
//           <div className="flex-grow"></div>
//           <div className="w-full flex justify-end px-[38px] pb-[39px]">
//             <button
//               className="bg-[#8671D4] text-white text-sm font-semibold rounded-md w-full h-10"
//               onClick={toggleSteps}
//             >
//               Set Goals
//             </button>
//           </div>
//         </>
//       )}
//       {steps == 3 && (
//         <>
//           <div className="w-[316px] sm:w-full mt-[264px] flex items-center flex-col">
//             <h1 className="text-[26px] font-semibold text-center">
//               Welcome to Haster Gym, liza_maharjan
//             </h1>
//             <div className="w-[281px]">
//               <p className="text-center mt-2 text-[15px]">
//                 We’ll add email and phone number from leeza.mhr@gmail.com to
//                 liza_maharjan. You can update this info anytime in Settings, or
//                 enter new info now.
//               </p>
//             </div>
//           </div>
//           <button
//             className="bg-[#8671D4] text-white text-sm font-semibold rounded-md w-[329px] h-10 mt-[21px]"
//             onClick={toggleSteps}
//           >
//             Complete
//           </button>
//           <button
//             className="text-[#8671D4] text-sm font-semibold rounded-md w-[329px] h-10 mt-2"
//             onClick={toggleSteps}
//           >
//             Add new phone or email
//           </button>
//         </>
//       )}
//     </div>
//   );
// }
