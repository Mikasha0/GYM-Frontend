import { UserData } from "@/types/userdata.type";
import { createUserEmailSchema } from "@/types/z.schema.types";
import emailjs from "@emailjs/browser";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineMail } from "react-icons/ai";
import { z } from "zod";
import { SubscriptionExpiryRow } from "./SubscriptionExpiryRow";
import InputForm from "./ui/inputForm";
import Pagination from "./ui/pagination";
import TextareaForm from "./ui/textareaForm";

export default function MemberSheetTable({ members }: { members: UserData[] }) {
  const [page, setPage] = useState(1);
  const [editChallengeId, setEditChallengeId] = useState(null);
  const [display, setDisplay] = useState<boolean>(false);
  const [enableInput, setEnableInput] = useState<boolean>(false);
  const form = useRef<null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof createUserEmailSchema>>({
    resolver: zodResolver(createUserEmailSchema),
    mode: "onChange",
  });

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
          alert("Email Sent Successfully!");
        },
        (error) => {
          alert("Check your internet connection");
        }
      );
  };

  return (
    <>
      <form ref={form} onSubmit={handleSubmit(handleEmail)}>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-400 bg-gray-50 ">
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
            {members.slice(page * 8 - 8, page * 8).map((member, id) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={member.id}
              >
                <th
                  scope="row"
                  className={`px-6 py-4 text-xs   text-black whitespace-nowrap font-normal ${
                    member.paymentStatus == "Overdue" ? "text-red-400" : ""
                  }`}
                >
                  {member.id}
                </th>
                <td
                  className={`px-5 py-4 text-xs font-normal text-black ${
                    member.paymentStatus == "Overdue" ? "text-red-400" : ""
                  }`}
                >
                  {member.firstname} {member?.middlename} {member.lastname}
                </td>
                <td
                  className={`px-5 py-4 text-xs font-normal text-black ${
                    member.paymentStatus == "Overdue" ? "text-red-400" : ""
                  }`}
                >
                  {member.phone}
                </td>
                <td
                  className={`px-5 py-4 text-xs font-normal text-black ${
                    member.paymentStatus == "Overdue" ? "text-red-400" : ""
                  }`}
                >
                  {member.email}
                </td>
                <td
                  className={`px-5 py-4 text-xs font-normal text-white ${
                    member.paymentStatus == "Overdue" ? "text-red-400" : ""
                  }`}
                >
                  <p
                    className={`w-full px-4 py-[3px] rounded-sm text-white ${
                      member.paymentStatus === "Pending"
                        ? "bg-[#FEB621]"
                        : member.paymentStatus === "Settled"
                        ? "bg-[#15C3FF]"
                        : member.paymentStatus === "Overdue"
                        ? "bg-[#FC4B67]"
                        : ""
                    }`}
                  >
                    {member.paymentStatus}
                  </p>
                </td>

                <SubscriptionExpiryRow member={member} />

                <td
                  className={`px-5 py-4 text-xs font-normal text-black ${
                    member.paymentStatus == "Overdue" ? "text-red-400" : ""
                  }`}
                  onClick={() => openEmailForm(member)}
                >
                  <AiOutlineMail size={18} />
                </td>
                {editChallengeId === member.id && (
                  <>
                    <div
                      className=" fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10"
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
                            className="text-xs text-white bg-red-500 rounded-md px-2 py-1 mr-2 mt-3"
                            onClick={handleCancel}
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="text-xs text-white py-1 bg-blue-500 rounded-md px-2 mt-3"
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
        <Pagination
          paginationData={members}
          page={page}
          setPage={setPage}
          perPageItems={8}
        />
      </form>
    </>
  );
}
