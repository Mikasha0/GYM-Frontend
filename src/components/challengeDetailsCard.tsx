import { UserData } from "@/types/userdata.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

export default function ChallengeDetailsCard({
  challenge,
  member,
}: {
  challenge: any;
  member: UserData[];
}) {
  const [present, setPresent] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: challenge.name,
    description: challenge.description,
    gender: "Inclusive", // Default gender value
  });

  const queryClient = useQueryClient();

  const showListGroup = () => {
    setPresent(!present);
  };

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/challenges/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete challenge");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["challenges"] });
      toast.success("Challenge deleted successfully!");
    },
    onError: () => {
      alert("Failed to delete challenge");
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: any) => {
      console.log(data);
      const challengeData = {
        name:data.name,
        description:data.description,
        gender:data.gender
      }
      const response = await fetch(`/api/challenges/${data.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(challengeData),
      });
      if (!response.ok) {
        throw new Error("Failed to update challenge");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["challenges"] });
      toast.success("Challenge updated successfully!");
      setEditMode(false);
    },
    onError: () => {
      alert("Failed to update challenge");
    },
  });

  const deleteChallenge = (id: string) => {
    deleteMutation.mutate(id);
  };

  const handleEditClick = () => {
    setEditMode(true);
    setPresent(false);
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate({ id: challenge.$id, ...formData });
  };

  const memberOnly = member.filter((mem) => mem.designation === "Member");

  return (
    <div className="relative w-full bg-white border p-3 border-gray-200 h-auto rounded-lg shadow-md hover:shadow-xl">
      <div className="flex justify-between">
        <h1 className="font-semibold text-sm line-clamp-3">{challenge.name}</h1>
        <button className="font-black" onClick={showListGroup}>
          ...
        </button>
      </div>
      {present && (
        <ul className="absolute right-2 p-1 mt-1 w-28 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          <li
            className="w-full px-3 py-1 text-xs hover:bg-gray-400 cursor-pointer rounded-md"
            onClick={handleEditClick}
          >
            Edit
          </li>
          <li
            className="w-full px-3 py-1 text-xs hover:bg-gray-400 cursor-pointer rounded-md"
            onClick={() => deleteChallenge(challenge.$id)}
          >
            Delete
          </li>
        </ul>
      )}
      {!editMode ? (
        <p className="text-xs mt-1 line-clamp-3">{challenge.description}</p>
      ) : (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="bg-white p-5 rounded shadow-lg w-4/12">
            <div className="flex justify-between">
              <h1 className="font-semibold mb-1">Update Challenge </h1>
              <button
                onClick={() => setEditMode(false)}
                className="text-gray-400 text-xl mb-1"
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleFormSubmit}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                className="w-full border p-1 rounded mt-1 text-xs"
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleFormChange}
                className="w-full border p-1 rounded mt-1 text-xs"
              />
              <select
                name="gender"
                value={formData.gender}
                onChange={handleFormChange}
                className="w-full border p-1 rounded mt-1 text-xs"
              >
                <option value="Inclusive">Inclusive</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <button
                type="submit"
                className="bg-[#8671D4] w-[106px] text-white px-4 py-2 rounded-sm mt-2 text-xs"
              >
                Update
              </button>
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="bg-[#F94343] w-[106px] px-4 py-2 text-white  rounded-sm mt-2 ml-2 text-xs"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
      <div className="grid grid-cols-6 mt-2">
        {memberOnly.slice(0, 4).map((member_image) => (
          <Image
            src={member_image.profile}
            key={member_image.id}
            className="rounded-full"
            width={30}
            height={30}
            alt="profile-img"
          />
        ))}
        {memberOnly.length > 4 && (
          <Link href={"/dashboard/members"} className="col-span-2">
            <span className="text-xs text-black font-semibold hover:text-red-400">
              +{memberOnly.length - 4} more
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}
