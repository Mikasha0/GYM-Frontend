import { Models } from "appwrite";
import { useState } from "react";
import InputForm from "./ui/inputForm";
type UserDocument = Models.Document & {
  name: string;
  email: string;
};
export default function UserDetailsStepper(data: any) {
  const [activeStepper, setActiveStepper] = useState(1);
  const userDetails = data.data;
  console.log(userDetails.firstname);

  return (
    <>
      <div className="mt-[36px] w-full flex px-4 items-center">
        <div className="flex flex-col items-center">
          <div
            className={`w-[41px] h-[41px] flex items-center justify-center  rounded-lg ${
              activeStepper == 1
                ? "bg-[#8671D4] text-white"
                : "bg-[#F0F8FF] text-[#373737] border border-[#373737]"
            }`}
            onClick={() => setActiveStepper(1)}
          >
            1
          </div>
          <p className="text-[16px] mt-2.5">Personal Details</p>
        </div>

        <hr className="border-t border-[#a6a6a6] flex-grow mb-10" />

        <div className="flex flex-col items-center">
          <div
            className={`w-[41px] h-[41px] flex items-center justify-center  rounded-lg ${
              activeStepper == 2
                ? "bg-[#8671D4] text-white"
                : "bg-[#F0F8FF] text-[#373737] border border-[#373737]"
            }`}
            onClick={() => setActiveStepper(2)}
          >
            2
          </div>
          <p className="text-[16px] mt-2.5">Body Metrics</p>
        </div>

        <hr className="border-t border-[#a6a6a6] flex-grow mb-10" />

        <div className="flex flex-col items-center">
          <div
            className={`w-[41px] h-[41px] flex items-center justify-center  rounded-lg ${
              activeStepper == 3
                ? "bg-[#8671D4] text-white"
                : "bg-[#F0F8FF] text-[#373737] border border-[#373737]"
            }`}
            onClick={() => setActiveStepper(3)}
          >
              3
          </div>
          <p className="text-[16px] mt-2.5">Subscription</p>
        </div>
      </div>
      {activeStepper == 1 && (
        <div className="w-full px-[42px] py-[39px]">
          <div className="flex justify-center gap-[18px] items-center">
            <div className="relative w-full">
              <label
                htmlFor="firstname"
                className={`absolute top-5 left-[10.4px] text-[8px] text-black transition-all pointer-events-none ${
                  userDetails.firstname
                    ? "transform -translate-y-4 text-xs"
                    : ""
                }`}
              >
                First Name
              </label>
              <input
                id="firstname"
                type="text"
                value={userDetails.firstname}
                placeholder=" "
                className="h-10 w-full md:w-full bg-[#dfdfdf] px-2 pt-5 border rounded focus:outline-none focus:border-blue-500 text-xs pb-[6.5px] pl-[10.4px]"
              />
            </div>
            <div className="relative w-full">
              <label
                htmlFor="firstname"
                className={`absolute top-5 left-[10.4px] text-[8px] text-black transition-all pointer-events-none ${
                  userDetails.firstname
                    ? "transform -translate-y-4 text-xs"
                    : ""
                }`}
              >
                Last Name
              </label>
              <input
                id="firstname"
                type="text"
                value={userDetails.lastname}
                placeholder=" "
                className="h-10 w-full md:w-full bg-[#dfdfdf] px-2 pt-5 border rounded focus:outline-none focus:border-blue-500 text-xs pb-[6.5px] pl-[10.4px]"
              />
            </div>
          </div>
          <div className="flex justify-center gap-[18px] items-center mt-[14px]">
            <div className="relative w-full">
              <label
                htmlFor="firstname"
                className={`absolute top-5 left-[10.4px] text-[8px] text-black transition-all pointer-events-none ${
                  userDetails.firstname
                    ? "transform -translate-y-4 text-xs"
                    : ""
                }`}
              >
                Phone Number
              </label>
              <input
                id="firstname"
                type="text"
                value={userDetails.phone}
                placeholder=" "
                className="h-10 w-full md:w-full bg-[#dfdfdf] px-2 pt-5 border rounded focus:outline-none focus:border-blue-500 text-xs pb-[6.5px] pl-[10.4px]"
              />
            </div>
            <div className="relative w-full">
              <label
                htmlFor="firstname"
                className={`absolute top-5 left-[10.4px] text-[8px] text-black transition-all pointer-events-none ${
                  userDetails.firstname
                    ? "transform -translate-y-4 text-xs"
                    : ""
                }`}
              >
                Date of Birth
              </label>
              <input
                id="firstname"
                type="text"
                value={
                  userDetails.dateOfBirth
                    ? new Date(userDetails.dateOfBirth)
                        .toISOString()
                        .split("T")[0]
                    : ""
                }
                placeholder=" "
                className="h-10 w-full md:w-full bg-[#dfdfdf] px-2 pt-5 border rounded focus:outline-none focus:border-blue-500 text-xs pb-[6.5px] pl-[10.4px]"
              />
            </div>
          </div>
          <div className="flex justify-center gap-[18px] items-center mt-[18px]">
            <div className="relative w-full">
              <label
                htmlFor="firstname"
                className={`absolute top-5 left-[10.4px] text-[8px] text-black transition-all pointer-events-none ${
                  userDetails.firstname
                    ? "transform -translate-y-4 text-xs"
                    : ""
                }`}
              >
                Gender
              </label>
              <input
                id="firstname"
                type="text"
                value={userDetails.gender}
                placeholder=" "
                className="h-10 w-full md:w-full bg-[#dfdfdf] px-2 pt-5 border rounded focus:outline-none focus:border-blue-500 text-xs pb-[6.5px] pl-[10.4px]"
              />
            </div>
            <div className="relative w-full">
              <label
                htmlFor="firstname"
                className={`absolute top-5 left-[10.4px] text-[8px] text-black transition-all pointer-events-none ${
                  userDetails.firstname
                    ? "transform -translate-y-4 text-xs"
                    : ""
                }`}
              >
                Address
              </label>
              <input
                id="firstname"
                type="text"
                value={userDetails.address}
                placeholder=" "
                className="h-10 w-full md:w-full bg-[#dfdfdf] px-2 pt-5 border rounded focus:outline-none focus:border-blue-500 text-xs pb-[6.5px] pl-[10.4px]"
              />
            </div>
          </div>
          <div className="relative w-full mt-[18px]">
            <label
              htmlFor="firstname"
              className={`absolute top-5 left-[10.4px] text-[8px] text-black transition-all pointer-events-none ${
                userDetails.firstname ? "transform -translate-y-4 text-xs" : ""
              }`}
            >
              Email
            </label>
            <input
              id="firstname"
              type="text"
              value={userDetails.email}
              placeholder=" "
              className="h-10 w-full bg-[#dfdfdf] px-2 pt-5 border rounded focus:outline-none focus:border-blue-500 text-xs pb-[6.5px] pl-[10.4px]"
            />
          </div>

          <div className="flex justify-center gap-[18px] items-center mt-[18px]">
            {userDetails.emergencyContactName !== "" && (
              <div className="relative w-full">
                <label
                  htmlFor="firstname"
                  className={`absolute top-5 left-[10.4px] text-[8px] text-black transition-all pointer-events-none ${
                    userDetails.firstname
                      ? "transform -translate-y-4 text-xs"
                      : ""
                  }`}
                >
                  Emergency Contact Name
                </label>
                <input
                  id="firstname"
                  type="text"
                  value={userDetails.emergencyContactName}
                  placeholder=" "
                  className="h-10 w-full md:w-full bg-[#dfdfdf] px-2 pt-5 border rounded focus:outline-none focus:border-blue-500 text-xs pb-[6.5px] pl-[10.4px]"
                />
              </div>
            )}
            {userDetails.emergencyContactNumber !== "" && (
              <div className="relative w-full">
                <label
                  htmlFor="firstname"
                  className={`absolute top-5 left-[10.4px] text-[8px] text-black transition-all pointer-events-none ${
                    userDetails.firstname
                      ? "transform -translate-y-4 text-xs"
                      : ""
                  }`}
                >
                  Emergency Contact Number
                </label>
                <input
                  id="firstname"
                  type="text"
                  value={userDetails.emergencyContactNumber}
                  placeholder=" "
                  className="h-10 w-full md:w-full bg-[#dfdfdf] px-2 pt-5 border rounded focus:outline-none focus:border-blue-500 text-xs pb-[6.5px] pl-[10.4px]"
                />
              </div>
            )}
          </div>
        </div>
      )}
      {activeStepper == 2 && (
        <div className="w-full px-[42px] py-[39px]">
          <div className="flex justify-center gap-[18px] items-center">
            <div className="relative w-full">
              <label
                htmlFor="firstname"
                className={`absolute top-5 left-[10.4px] text-[8px] text-black transition-all pointer-events-none ${
                  userDetails.firstname
                    ? "transform -translate-y-4 text-xs"
                    : ""
                }`}
              >
                Height
              </label>
              <input
                id="firstname"
                type="text"
                value={userDetails.height}
                placeholder=" "
                className="h-10 w-full md:w-full bg-[#dfdfdf] px-2 pt-5 border rounded focus:outline-none focus:border-blue-500 text-xs pb-[6.5px] pl-[10.4px]"
              />
            </div>
            <div className="relative w-full">
              <label
                htmlFor="firstname"
                className={`absolute top-5 left-[10.4px] text-[8px] text-black transition-all pointer-events-none ${
                  userDetails.firstname
                    ? "transform -translate-y-4 text-xs"
                    : ""
                }`}
              >
                Weight
              </label>
              <input
                id="firstname"
                type="text"
                value={userDetails.weight}
                placeholder=" "
                className="h-10 w-full md:w-full bg-[#dfdfdf] px-2 pt-5 border rounded focus:outline-none focus:border-blue-500 text-xs pb-[6.5px] pl-[10.4px]"
              />
            </div>
          </div>
          <div className="flex justify-center gap-[18px] items-center mt-[14px]">
            <div className="relative w-full">
              <label
                htmlFor="firstname"
                className={`absolute top-5 left-[10.4px] text-[8px] text-black transition-all pointer-events-none ${
                  userDetails.firstname
                    ? "transform -translate-y-4 text-xs"
                    : ""
                }`}
              >
                Hips
              </label>
              <input
                id="hips"
                type="text"
                value={userDetails.hips}
                placeholder=" "
                className="h-10 w-full md:w-full bg-[#dfdfdf] px-2 pt-5 border rounded focus:outline-none focus:border-blue-500 text-xs pb-[6.5px] pl-[10.4px]"
              />
            </div>
            <div className="relative w-full">
              <label
                htmlFor="firstname"
                className={`absolute top-5 left-[10.4px] text-[8px] text-black transition-all pointer-events-none ${
                  userDetails.firstname
                    ? "transform -translate-y-4 text-xs"
                    : ""
                }`}
              >
                Chest
              </label>
              <input
                id="chest"
                type="text"
                value={userDetails.chest}
                placeholder=" "
                className="h-10 w-full md:w-full bg-[#dfdfdf] px-2 pt-5 border rounded focus:outline-none focus:border-blue-500 text-xs pb-[6.5px] pl-[10.4px]"
              />
            </div>
          </div>
          <div className="flex justify-center gap-[18px] items-center mt-[18px]">
            <div className="relative w-full">
              <label
                htmlFor="firstname"
                className={`absolute top-5 left-[10.4px] text-[8px] text-black transition-all pointer-events-none ${
                  userDetails.firstname
                    ? "transform -translate-y-4 text-xs"
                    : ""
                }`}
              >
                Waist
              </label>
              <input
                id="firstname"
                type="text"
                value={userDetails.waist}
                placeholder=" "
                className="h-10 w-full md:w-full bg-[#dfdfdf] px-2 pt-5 border rounded focus:outline-none focus:border-blue-500 text-xs pb-[6.5px] pl-[10.4px]"
              />
            </div>
            <div className="relative w-full">
              <label
                htmlFor="firstname"
                className={`absolute top-5 left-[10.4px] text-[8px] text-black transition-all pointer-events-none ${
                  userDetails.firstname
                    ? "transform -translate-y-4 text-xs"
                    : ""
                }`}
              >
                Thighs
              </label>
              <input
                id="firstname"
                type="text"
                value={userDetails.thigh}
                placeholder=" "
                className="h-10 w-full md:w-full bg-[#dfdfdf] px-2 pt-5 border rounded focus:outline-none focus:border-blue-500 text-xs pb-[6.5px] pl-[10.4px]"
              />
            </div>
          </div>

          <div className="flex justify-center gap-[18px] items-center mt-[18px]">
            {userDetails.allergies !== "" && (
              <div className="relative w-full">
                <label
                  htmlFor="firstname"
                  className={`absolute top-5 left-[10.4px] text-[8px] text-black transition-all pointer-events-none ${
                    userDetails.firstname
                      ? "transform -translate-y-4 text-xs"
                      : ""
                  }`}
                >
                  Allergies
                </label>
                <input
                  id="firstname"
                  type="text"
                  value={userDetails.allergies}
                  placeholder=" "
                  className="h-10 w-full md:w-full bg-[#dfdfdf] px-2 pt-5 border rounded focus:outline-none focus:border-blue-500 text-xs pb-[6.5px] pl-[10.4px]"
                />
              </div>
            )}
            {userDetails.emergencyContactNumber !== "" && (
              <div className="relative w-full">
                <label
                  htmlFor="firstname"
                  className={`absolute top-5 left-[10.4px] text-[8px] text-black transition-all pointer-events-none ${
                    userDetails.firstname
                      ? "transform -translate-y-4 text-xs"
                      : ""
                  }`}
                >
                  Medical Condition
                </label>
                <input
                  id="firstname"
                  type="text"
                  value={userDetails.medicalCondition}
                  placeholder=" "
                  className="h-10 w-full md:w-full bg-[#dfdfdf] px-2 pt-5 border rounded focus:outline-none focus:border-blue-500 text-xs pb-[6.5px] pl-[10.4px]"
                />
              </div>
            )}
          </div>
        </div>
      )}
      {activeStepper == 3 && (
        <div className="w-full px-[42px] py-[39px]">
          <div className="flex justify-center gap-[18px] items-center">
            <div className="relative w-full">
              <label
                htmlFor="firstname"
                className={`absolute top-5 left-[10.4px] text-[8px] text-black transition-all pointer-events-none ${
                  userDetails.firstname
                    ? "transform -translate-y-4 text-xs"
                    : ""
                }`}
              >
                Category
              </label>
              <input
                id="firstname"
                type="text"
                value={userDetails.category}
                placeholder=" "
                className="h-10 w-full md:w-full bg-[#dfdfdf] px-2 pt-5 border rounded focus:outline-none focus:border-blue-500 text-xs pb-[6.5px] pl-[10.4px]"
              />
            </div>
            <div className="relative w-full">
              <label
                htmlFor="firstname"
                className={`absolute top-5 left-[10.4px] text-[8px] text-black transition-all pointer-events-none ${
                  userDetails.firstname
                    ? "transform -translate-y-4 text-xs"
                    : ""
                }`}
              >
                Payment Method
              </label>
              <input
                id="firstname"
                type="text"
                value={userDetails.paymentMethod}
                placeholder=" "
                className="h-10 w-full md:w-full bg-[#dfdfdf] px-2 pt-5 border rounded focus:outline-none focus:border-blue-500 text-xs pb-[6.5px] pl-[10.4px]"
              />
            </div>
          </div>
          <div className="flex justify-center gap-[18px] items-center mt-[14px]">
            <div className="relative w-full">
              <label
                htmlFor="firstname"
                className={`absolute top-5 left-[10.4px] text-[8px] text-black transition-all pointer-events-none ${
                  userDetails.firstname
                    ? "transform -translate-y-4 text-xs"
                    : ""
                }`}
              >
                Start Date
              </label>
              <input
                type="text"
                value={
                  userDetails.joindate
                    ? new Date(userDetails.joindate).toISOString().split("T")[0]
                    : ""
                }
                placeholder=" "
                className="h-10 w-full md:w-full bg-[#dfdfdf] px-2 pt-5 border rounded focus:outline-none focus:border-blue-500 text-xs pb-[6.5px] pl-[10.4px]"
              />
            </div>
            <div className="relative w-full">
              <label
                htmlFor="firstname"
                className={`absolute top-5 left-[10.4px] text-[8px] text-black transition-all pointer-events-none ${
                  userDetails.firstname
                    ? "transform -translate-y-4 text-xs"
                    : ""
                }`}
              >
                End Date
              </label>
              <input
                id="chest"
                type="text"
                value={
                  userDetails.enddate
                    ? new Date(userDetails.enddate).toISOString().split("T")[0]
                    : ""
                }
                placeholder=" "
                className="h-10 w-full md:w-full bg-[#dfdfdf] px-2 pt-5 border rounded focus:outline-none focus:border-blue-500 text-xs pb-[6.5px] pl-[10.4px]"
              />
            </div>
          </div>
          <div className="flex justify-center gap-[18px] items-center mt-[18px]">
            <div className="relative w-full">
              <label
                htmlFor="firstname"
                className={`absolute top-5 left-[10.4px] text-[8px] text-black transition-all pointer-events-none ${
                  userDetails.firstname
                    ? "transform -translate-y-4 text-xs"
                    : ""
                }`}
              >
                Payment Method
              </label>
              <input
                id="firstname"
                type="text"
                value={userDetails.paymentMethod}
                placeholder=" "
                className="h-10 w-full md:w-full bg-[#dfdfdf] px-2 pt-5 border rounded focus:outline-none focus:border-blue-500 text-xs pb-[6.5px] pl-[10.4px]"
              />
            </div>
          </div>

          <div className="flex justify-center gap-[18px] items-center mt-[18px]">
            {userDetails.allergies !== "" && (
              <div className="relative w-full">
                <label
                  htmlFor="firstname"
                  className={`absolute top-5 left-[10.4px] text-[8px] text-black transition-all pointer-events-none ${
                    userDetails.firstname
                      ? "transform -translate-y-4 text-xs"
                      : ""
                  }`}
                >
                  Allergies
                </label>
                <input
                  id="firstname"
                  type="text"
                  value={userDetails.allergies}
                  placeholder=" "
                  className="h-10 w-full md:w-full bg-[#dfdfdf] px-2 pt-5 border rounded focus:outline-none focus:border-blue-500 text-xs pb-[6.5px] pl-[10.4px]"
                />
              </div>
            )}
            {userDetails.emergencyContactNumber !== "" && (
              <div className="relative w-full">
                <label
                  htmlFor="firstname"
                  className={`absolute top-5 left-[10.4px] text-[8px] text-black transition-all pointer-events-none ${
                    userDetails.firstname
                      ? "transform -translate-y-4 text-xs"
                      : ""
                  }`}
                >
                  Medical Condition
                </label>
                <input
                  id="firstname"
                  type="text"
                  value={userDetails.medicalCondition}
                  placeholder=" "
                  className="h-10 w-full md:w-full bg-[#dfdfdf] px-2 pt-5 border rounded focus:outline-none focus:border-blue-500 text-xs pb-[6.5px] pl-[10.4px]"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
