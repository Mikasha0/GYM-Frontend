import RegisterUserForm from "@/components/form/RegisterUserForm";

export default function CreateUser() {
  return (
    <div className={`h-screen bg-gray-100 py-5 pr-5 flex flex-col`}>
      <div className="w-full bg-white p-6 rounded-2xl h-full">
      <div
          className="overflow-y-auto flex-grow scrollbar-hide"
          style={{ maxHeight: "calc(100vh - 100px)" }} // Adjust 100px as per header height
        >
        <h1 className="font-semibold">Registration Form</h1>
        <RegisterUserForm />
      </div>
      </div>
    </div>
  );
}
