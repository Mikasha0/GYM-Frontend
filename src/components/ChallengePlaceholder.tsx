import { Models } from "appwrite";
import React from "react";
type UserDocument = Models.Document & {
  name: string;
  email: string;
};
export default function ChallengePlaceholder(data:UserDocument) {
  return (
    <div className="relative w-full h-[100px] bg-white border p-3 border-gray-200  rounded-lg shadow-md hover:shadow-xl flex justify-center items-center">
      <h1 className="text-sm text-[#7C7C7C]">Create new challenge</h1>
    </div>
  );
}
