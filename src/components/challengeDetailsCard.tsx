import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import JoinedMembers from "./joinedMembers";

export default function ChallengeDetailsCard({ challenge }: any) {
  const [present, setPresent] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: challenge.name,
    description: challenge.description,
  });

  const queryClient = useQueryClient();

  const showListGroup = () => {
    setPresent(!present);
  };

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`http://localhost:2000/challenges/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete challenge");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["challenges"] });
      alert("Challenge deleted successfully");
    },
    onError: () => {
      alert("Failed to delete challenge");
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch(`http://localhost:2000/challenges/${data.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to update challenge");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["challenges"] });
      alert("Challenge updated successfully");
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

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate({ id: challenge.id, ...formData });
  };

  return (
    <div className="relative w-full bg-white border p-3 border-gray-200 h-[150px] rounded-lg shadow-md hover:shadow-xl">
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
            onClick={() => deleteChallenge(challenge.id)}
          >
            Delete
          </li>
        </ul>
      )}
      {!editMode ? (
        <p className="text-xs mt-1">{challenge.description}</p>
      ) : (
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
          <button
            type="submit"
            className="bg-blue-500 text-white px-3 py-[2px] rounded mt-1 text-xs"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => setEditMode(false)}
            className="bg-gray-500 text-white px-3 py-[2px] rounded mt-1 ml-2 text-xs"
          >
            Cancel
          </button>
        </form>
      )}
      {/* <JoinedMembers/> */}
    </div>
  );
}
