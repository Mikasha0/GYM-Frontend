"use client";
import { useForm } from "react-hook-form";
export default function Upload() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    const image = data.profile[0];
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "images_preset");
    const uploadResponse = await fetch(
      "https://api.cloudinary.com/v1_1/deb5hrg5z/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    const uploadedImageData = await uploadResponse.json();
    const imageUrl = uploadedImageData.secure_url;
    console.log(imageUrl);  };
  return (
    <div className="w-full bg-gray-100 p-5 pb-0">
      <div className="bg-white p-5">
        <h1 className="font-semibold">Test Form</h1>
        <form className="mt-6 mx-16" onSubmit={handleSubmit(onSubmit)}>
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="file_input"
          >
            Upload file
          </label>
          <input
            {...register("profile")}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            aria-describedby="file_input_help"
            id="file_input"
            type="file"
          />
          <p
            className="mt-1 text-sm text-gray-500 dark:text-gray-300"
            id="file_input_help"
          >
            SVG, PNG, JPG or GIF (MAX. 800x400px).
          </p>

          <button
            type="submit"
            className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 my-4"
          >
            Upload to Cloud
          </button>
        </form>
      </div>
    </div>
  );
}

// import { useRef } from "react";

// export default function TestForm() {
//   const name = useRef<HTMLInputElement>(null);
//   const handleSubmit = (event: any) => {
//     event.preventDefault();
//     console.log(name.current?.value);
//   };

//   return (
//     <div className="w-full bg-gray-100 p-5 pb-0">
//       <div className="bg-white p-5">
//         <h1 className="font-semibold">Test Form</h1>
//         <form onSubmit={handleSubmit}>
//           <div className="grid grid-cols-3 gap-2 mt-2">
//             {/* <input
//               className="px-3 py-1 border border-black rounded-md"
//               type="text"
//               placeholder="Enter your name"
//               ref={name}
//             />
//             <input
//               className="px-3 py-1 border border-black rounded-md"
//               type="text"
//               placeholder="Enter your email"
//               name="email"
//             /> */}
//             <input
//               className="px-3 py-1 border border-black rounded-md"
//               accept=".png, .jpg"
//               type="file"
//               name="image"
//             />
//           </div>
//           <button
//             type="submit"
//             className="bg-blue-400 mt-4 w-[15%] px-2 py-1 rounded-md text-white"
//           >
//             Upload Image
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
