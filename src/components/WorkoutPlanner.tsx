// "use client";
// import { useEffect, useState } from "react";
// import { useForm, SubmitHandler } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { UserData } from "@/types/userdata.type";
// import { useRouter } from "next/navigation";
// import WorkOutDetails, { getWorkOutPlanById } from "./WorkOutDetails";
// const exercisesByBodyPart: { [key: string]: string[] } = {
//   Chest: ["Bench Press", "Chest Fly", "Push Up", "Inclined Bench Press"],
//   Back: ["Pull Up", "Deadlift", "Row"],
//   Legs: ["Squat", "Leg Press", "Lunge"],
//   Arms: ["Bicep Curl", "Tricep Extension", "Hammer Curl"],
//   Shoulders: ["Shoulder Press", "Lateral Raise", "Front Raise"],
// };
 
// const setDetailsSchema = z.object({
//   reps: z.number().min(1, "Reps must be at least 1"),
//   weight: z.number().min(1, "Weight must be at least 1"),
// });

// type SetDetails = {
//   reps: number ;
//   weight: number ;
// } ;

// type ExerciseSets = {
//   [key: string]: number;
// };

// type ExerciseDetails = {
//   exercise: string;
//   sets: SetDetails[];
// };

// const WorkoutPlanner = ({ member }: { member: UserData }) => {
//   const [step, setStep] = useState(1);
//   const [selectedBodyPart, setSelectedBodyPart] = useState<string | null>(null);
//   const [selectedExercises, setSelectedExercises] = useState<string[]>([]);
//   const [exerciseSets, setExerciseSets] = useState<ExerciseSets>({});
//   const [exerciseDetails, setExerciseDetails] = useState<ExerciseDetails[]>([]);
  
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm<{ sets: SetDetails[] }>({
//     resolver: zodResolver(z.object({ sets: z.array(setDetailsSchema) })),
//   });

//   const handleBodyPartSelect = (bodyPart: string) => {
//     setSelectedBodyPart(bodyPart);
//     setSelectedExercises([]);
//     setExerciseSets({});
//     setExerciseDetails([]);
//     setStep(3);
//   };

//   const handleExerciseSelect = (exercise: string) => {
//     setSelectedExercises((prev) =>
//       prev.includes(exercise)
//         ? prev.filter((ex) => ex !== exercise)
//         : [...prev, exercise]
//     );
//   };

//   const handleSetCountChange = (exercise: string, count: number) => {
//     setExerciseSets((prev) => ({ ...prev, [exercise]: count }));
//   };

//   const handleSetDetailsSubmit: SubmitHandler<{ sets: SetDetails[] }> = (
//     data
//   ) => {
//     const newExerciseDetails = selectedExercises.map((exercise, index) => ({
//       exercise,
//       sets: data.sets.slice(
//         index * exerciseSets[exercise],
//         (index + 1) * exerciseSets[exercise]
//       ),
//     }));
//     setExerciseDetails(newExerciseDetails);
//     setStep(6);
//     reset();
//   };

//   const handleWorkoutSubmit = async () => {
//     const workoutPlan = {
//       id: `workout-${Date.now()}`, 
//       userId: member.id, 
//       bodyPart: selectedBodyPart,
//       exercises: exerciseDetails,
//     };


//     try {
//       const response = await fetch("http://localhost:2000/workouts", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(workoutPlan),
//       });
      
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       setSelectedBodyPart(null);
//       setSelectedExercises([]);
//       setExerciseSets({});
//       setExerciseDetails([]);
//       setStep(1);
//     } catch (error) {
//       console.error("Error registering user:", error);
//     }
//   };

//   return (
//     <>
//     <div>
//       {step === 1 && (
//         <div>
//           <button
//             onClick={() => setStep(2)}
//             className="px-6 mt-3 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
//           >
//             Plan Workout
//           </button>
//         </div>
//       )}

//       {step === 2 && (
//         <div className="w-full p-4 bg-white rounded-lg shadow-lg mt-3">
//           <h2 className="text-2xl font-bold mb-4 text-center">
//             Select Body Part
//           </h2>
//           <div className="flex flex-wrap justify-center">
//             {Object.keys(exercisesByBodyPart).map((bodyPart) => (
//               <button
//                 key={bodyPart}
//                 onClick={() => handleBodyPartSelect(bodyPart)}
//                 className="m-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
//               >
//                 {bodyPart}
//               </button>
//             ))}
//           </div>
//           <button
//             onClick={() => setStep(1)}
//             className="mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
//           >
//             Back
//           </button>
//         </div>
//       )}

//       {step === 3 && selectedBodyPart && (
//         <div className="w-full p-4 bg-white rounded-lg shadow-lg mt-3">
//           <h2 className="text-2xl font-bold mb-4 text-center">
//             Select Exercises for {selectedBodyPart}
//           </h2>
//           <div className="flex flex-col items-start">
//             {exercisesByBodyPart[selectedBodyPart].map((exercise) => (
//               <div key={exercise} className="flex items-center mb-2">
//                 <input
//                   type="checkbox"
//                   id={exercise}
//                   checked={selectedExercises.includes(exercise)}
//                   onChange={() => handleExerciseSelect(exercise)}
//                   className="mr-2 leading-tight"
//                 />
//                 <label htmlFor={exercise} className="text-gray-700">
//                   {exercise}
//                 </label>
//               </div>
//             ))}
//           </div>
//           <div className="flex justify-between">
//             <button
//               onClick={() => setStep(4)}
//               className="mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
//             >
//               Next
//             </button>
//             <button
//               onClick={() => setStep(2)}
//               className="mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
//             >
//               Back
//             </button>
//           </div>
//         </div>
//       )}

//       {step === 4 && (
//         <div className="w-full p-4 bg-white rounded-lg shadow-lg mt-3">
//           <h2 className="text-2xl font-bold mb-4 text-center">
//             Specify Number of Sets
//           </h2>
//           <div className="flex flex-col items-start w-full">
//             {selectedExercises.map((exercise) => (
//               <div key={exercise} className="flex items-center mb-4 w-full">
//                 <label
//                   htmlFor={`${exercise}-sets`}
//                   className="text-gray-700 w-1/2"
//                 >
//                   {exercise} Sets:
//                 </label>
//                 <input
//                   type="number"
//                   id={`${exercise}-sets`}
//                   min="1"
//                   value={exerciseSets[exercise] || ""}
//                   onChange={(e) =>
//                     handleSetCountChange(exercise, parseInt(e.target.value))
//                   }
//                   className="px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-1/2"
//                 />
//               </div>
//             ))}
//           </div>
//           <div className="flex justify-between">
//             <button
//               onClick={() => setStep(3)}
//               className="mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
//             >
//               Back
//             </button>
//             <button
//               onClick={() => setStep(5)}
//               className="mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       )}

//       {step === 5 && (
//         <div className="w-full p-4 bg-white rounded-lg shadow-lg mt-3">
//           <h2 className="text-2xl font-bold mb-4 text-center">
//             Enter Sets, Reps, and Weight
//           </h2>
//           <form
//             onSubmit={handleSubmit(handleSetDetailsSubmit)}
//             className="flex flex-col items-center"
//           >
//             {selectedExercises.map((exercise, index) => (
//               <div key={exercise} className="mb-6 w-full">
//                 <h3 className="text-xl font-semibold text-center mb-2">
//                   {exercise}
//                 </h3>
//                 {Array.from({ length: exerciseSets[exercise] }).map(
//                   (_, setIndex) => (
//                     <div key={setIndex} className="flex justify-between mb-2">
//                       <input
//                         type="number"
//                         {...register(
//                           `sets.${
//                             index * exerciseSets[exercise] + setIndex
//                           }.reps`,
//                           {
//                             valueAsNumber: true,
//                           }
//                         )}
//                         placeholder={`Set ${setIndex + 1} reps`}
//                         className="px-4 py-2 border rounded-lg text-gray-700 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       />
//                       {errors.sets?.[index * exerciseSets[exercise] + setIndex]
//                         ?.reps && (
//                         <span className="text-red-500">
//                           {
//                             errors.sets[
//                               index * exerciseSets[exercise] + setIndex
//                             ].reps?.message
//                           }
//                         </span>
//                       )}
//                       <input
//                         type="number"
//                         {...register(
//                           `sets.${
//                             index * exerciseSets[exercise] + setIndex
//                           }.weight`,
//                           {
//                             valueAsNumber: true,
//                           }
//                         )}
//                         placeholder={`Set ${setIndex + 1} weight`}
//                         className="px-4 py-2 border rounded-lg text-gray-700 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       />
//                       {errors.sets?.[index * exerciseSets[exercise] + setIndex]
//                         ?.weight && (
//                         <span className="text-red-500">
//                           {
//                             errors.sets[
//                               index * exerciseSets[exercise] + setIndex
//                             ].weight?.message
//                           }
//                         </span>
//                       )}
//                     </div>
//                   )
//                 )}
//               </div>
//             ))}
//             <button
//               type="submit"
//               className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
//             >
//               Submit
//             </button>
//           </form>
//         </div>
//       )}

//       {step === 6 && (
//         <div className="w-full p-4 bg-white rounded-lg shadow-lg mt-3">
//           <h2 className="text-2xl font-bold mb-4 text-center">
//             Workout Summary
//           </h2>
//           <div className="text-center">
//             {exerciseDetails.map((detail, index) => (
//               <div key={index} className="mb-4">
//                 <h3 className="text-xl font-semibold">{detail.exercise}</h3>
//                 {detail.sets.map((set, setIndex) => (
//                   <div key={setIndex}>
//                     <p>
//                       Set {setIndex + 1}: Reps: {set.reps}, Weight: {set.weight}{" "}
//                       lbs
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             ))}
//           </div>
//           <button
//             onClick={handleWorkoutSubmit}
//             className="mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
//           >
//             Finish
//           </button>
//         </div>
//       )}
//     </div>
//     <WorkOutDetails member={member}/>

//     </>
//   );
// };

// export default WorkoutPlanner;
