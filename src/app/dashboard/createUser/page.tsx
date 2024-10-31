import RegisterUserForm from "@/components/form/RegisterUserForm";

export default function CreateUser() {
  return (
    <div className="min-h-screen bg-gray-100 py-5 pr-5 flex flex-col">
      <div className="w-full bg-white p-6 rounded-2xl flex-grow">
        <h1 className="font-semibold">Registration Form</h1>
        <RegisterUserForm />
      </div>
    </div>
  );
}
