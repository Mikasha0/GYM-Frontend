import RegisterUserForm from "@/components/form/RegisterUserForm";
export default function CreateUser() {
  return (
    <div className="w-full bg-gray-100 p-5 h-full">
      <div className="w-full bg-white  p-6 rounded-lg shadow-xl">
        <h1 className="font-semibold">Registration Form</h1>
        <RegisterUserForm />
      </div>
    </div>
  );
}
