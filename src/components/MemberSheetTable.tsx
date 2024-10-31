import { UserData } from "@/types/userdata.type";
import { createUserEmailSchema } from "@/types/z.schema.types";
import emailjs from "@emailjs/browser";
import { zodResolver } from "@hookform/resolvers/zod";
import { differenceInDays } from "date-fns";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineMail } from "react-icons/ai";
import { z } from "zod";
import InputForm from "./ui/inputForm";
import Pagination from "./ui/pagination";
import TextareaForm from "./ui/textareaForm";
import SubscriptionExpiryRow from "./SubscriptionExpiryRow";
import { toast } from "sonner";
import { useTheme } from "@/context/ThemeContext";
import Image from "next/image";

export default function MemberSheetTable({ members }: { members: UserData[] }) {
  const [page, setPage] = useState(1);
  const [editChallengeId, setEditChallengeId] = useState(null);
  const [display, setDisplay] = useState<boolean>(false);
  const [enableInput, setEnableInput] = useState<boolean>(false);
  const { darkTheme } = useTheme();
  const form = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof createUserEmailSchema>>({
    resolver: zodResolver(createUserEmailSchema),
    mode: "onChange",
  });
  const findPassedDate = (joindate: any) => {
    const curr_date = new Date();
    const join_date = new Date(joindate);
    return differenceInDays(curr_date, join_date);
  };

  const openEmailForm = (member: any) => {
    setEditChallengeId(member.id);
    setDisplay(true);
    setEnableInput(false);
    reset(member);
  };

  const handleCancel = () => {
    setEditChallengeId(null);
    setDisplay(false);
    setEnableInput(false);
  };

  const handleEmail = () => {
    emailjs
      .sendForm("service_cpcq2i9", "template_y5xi7tj", form.current, {
        publicKey: "RnG_N-Pz9J65AO8xJ",
      })
      .then(
        () => {
          setEditChallengeId(null);
          setDisplay(false);
          setEnableInput(false);
          toast.success("User details updated successfully!");
        },
        (error) => {
          alert("Check your internet connection");
        }
      );
  };
  const filteredMembers = members.filter(
    (member) => member.designation === "Member"
  );

  return (
    <>
      <form ref={form} onSubmit={handleSubmit(handleEmail)}>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead
            className={`text-xs text-gray-400 ${
              darkTheme ? "bg-[#353935]" : "bg-gray-50"
            }`}
          >
            <tr>
              <th scope="col" className="px-5 py-3 font-normal">
                #
              </th>
              <th scope="col" className="px-5 py-3 font-normal">
                Name
              </th>
              <th scope="col" className="px-5 py-3 font-normal">
                Phone Number
              </th>
              <th scope="col" className="px-5 py-3 font-normal">
                Email
              </th>
              <th scope="col" className="px-5 py-3 font-normal">
                Payment Status
              </th>
              <th scope="col" className="px-5 py-3 font-normal">
                Subscription Expiry
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredMembers
              .slice(page * 8 - 8, page * 8)
              .map((member, index) => (
                <tr
                  className={`${
                    darkTheme ? "bg-[#353935]" : "bg-white"
                  } border-b dark:bg-gray-800 dark:border-gray-700`}
                  key={member.id}
                >
                  <th
                    scope="row"
                    className={`px-6 py-4 text-xs  ${
                      darkTheme ? "text-white" : "text-black"
                    } whitespace-nowrap font-normal`}
                  >
                    {index + 1 + (page - 1) * 8}
                  </th>
                  <td
                    className={`px-5 py-4 text-xs font-normal ${
                      darkTheme ? "text-white" : "text-black"
                    }`}
                  >
                    {member.firstname} {member.lastname}
                  </td>
                  <td
                    className={`px-5 py-4 text-xs font-normal ${
                      darkTheme ? "text-white" : "text-black"
                    }`}
                  >
                    {member.phone}
                  </td>
                  <td
                    className={`px-5 py-4 text-xs font-normal ${
                      darkTheme ? "text-white" : "text-black"
                    }`}
                  >
                    {member.email}
                  </td>
                  <td className="px-9 py-4 text-xs font-normal text-white text-center">
                    <p
                      className={`w-full px-2 py-[3px] rounded-sm text-white ${
                        member.paymentStatus === "Pending"
                          ? "bg-[#FEB621]"
                          : "bg-[#15C3FF]"
                      }`}
                    >
                      {member.paymentStatus}
                    </p>
                  </td>

                  <SubscriptionExpiryRow member={member} />

                  <td
                    className={`px-5 py-4 text-xs font-normal ${
                      darkTheme ? "text-white" : "text-black"
                    }`}
                    onClick={() => openEmailForm(member)}
                  >
                    <AiOutlineMail size={18} />
                  </td>
                  {editChallengeId === member.id && (
                    <>
                      <div
                        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10"
                        key={member.id}
                      >
                        <div className="bg-white p-5 rounded shadow-lg w-4/12">
                          <div className="flex justify-between">
                            <h1 className="font-semibold mb-1">Send Mail</h1>
                            <button
                              onClick={handleCancel}
                              className="text-gray-400 text-xl mb-1"
                            >
                              &times;
                            </button>
                          </div>

                          <div className="grid grid-cols-3 gap-2">
                            <InputForm
                              inputType="text"
                              labelName="First Name"
                              inputClassName={`font-semibold text-xs ${
                                display ? "" : "border-none"
                              }`}
                              register={register}
                              name="firstname"
                              errors={errors}
                              enable={enableInput}
                            />
                            <InputForm
                              inputType="text"
                              labelName="Middle Name"
                              inputClassName={`font-semibold text-xs ${
                                display ? "" : "border-none"
                              }`}
                              register={register}
                              name="middlename"
                              errors={errors}
                              enable={enableInput}
                            />
                            <InputForm
                              inputType="text"
                              labelName="Last Name"
                              inputClassName={`font-semibold text-xs ${
                                display ? "" : "border-none"
                              }`}
                              register={register}
                              name="lastname"
                              errors={errors}
                              enable={enableInput}
                            />
                          </div>
                          <InputForm
                            inputType="text"
                            labelName="Email"
                            inputClassName={`font-semibold text-xs ${
                              display ? "" : "border-none"
                            }`}
                            register={register}
                            name="email"
                            errors={errors}
                            enable={enableInput}
                          />
                          <TextareaForm
                            labelName="Message"
                            register={register}
                            name="message"
                            errors={errors}
                          />
                          <div className="flex justify-end">
                            <button
                              type="button"
                              className="w-[106px] text-xs text-white bg-[#E94713] rounded-sm px-4 py-2 mr-2 mt-3"
                              onClick={handleCancel}
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="w-[106px] text-xs text-white py-2 bg-[#8671D4] rounded-sm px-4 mt-3"
                            >
                              Send Mail
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
        {filteredMembers.length == 0 && (
          <div className="w-[100%] flex flex-col justify-center items-center h-[70px]">
              <Image
                src="/record.png"
                width={15}
                height={15}
                alt="member_record"
              />
            <h1 className="text-[#7C7C7C] text-sm p-1">No Records were found</h1>

          </div>
        )}
        <Pagination paginationData={members} page={page} setPage={setPage} />
      </form>
    </>
  );
}
