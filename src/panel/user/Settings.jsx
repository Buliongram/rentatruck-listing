import React from "react";
import {
  FaCamera,
  FaCheck,
  FaIdBadge,
  FaPen,
  FaPenAlt,
  FaPencilAlt,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { FaCircleXmark, FaXmark } from "react-icons/fa6";
import { useRef } from "react";
import { useSettings } from "../utilities/useSettings";
import { RiPoliceBadgeFill } from "react-icons/ri";
export default function Settings() {
  const user = useSelector((state) => state.user);

  const {
    toggleName,
    setToggleName,
    toggleEmail,
    setToggleEmail,
    togglePassword,
    setTogglePassword,
    toggleDelete,
    setToggleDelete,
    emailCodeCont,
    name,
    setName,
    email,
    setEmail,
    setEmailCodeCont,
    emailCode,
    setEmailCode,
    password,
    setPassword,
    isLoading,
    handleNameChange,
    handleSendEmailCode,
    handleEmailChange,
    handlePasswordChange,
    handleAccountDeletion,
  } = useSettings();
 
  return (
    <>
      <section className="flex flex-col divide-y divide-zinc-300 lg:p-14 p-4 bg-white rounded-3xl">
        <section className="flex flex-col gap-4 w-full pb-10">
          <main className="flex flex-col divide-y divide-zinc-100">
            {!toggleName ? (
              <section className="flex w-full items-center justify-between text-xs py-4">
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">Full Name</span>
                  <p className="text-xs text-zinc-500/90 capitalize font-normal">{`${user.firstname} ${user.lastname}`}</p>
                </div>
                <p
                  className="text-xs font-medium cursor-pointer flex items-center gap-2 border rounded-full border-zinc-200 py-1.5 px-3 text-zinc-500/80"
                  onClick={() => setToggleName(true)}
                >
                  Edit <FaPencilAlt />
                </p>
              </section>
            ) : (
              <main className="flex flex-col gap-3 py-4">
                <section className="flex w-full items-start justify-between text-xs py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">Edit name</span>
                    <p className="text-xs text-zinc-500/90 font-normal">
                      This will be visible on your profile and for your other
                      team members if you’re in a team.
                    </p>
                  </div>
                  <p
                    className="text-xs font-medium cursor-pointer flex items-center gap-2 border rounded-full border-zinc-200 py-1.5 px-3 text-zinc-500/80"
                    onClick={() => setToggleName(false)}
                  >
                    Cancel <FaCircleXmark />
                  </p>
                </section>
                <form
                  onSubmit={handleNameChange}
                  className="flex flex-col gap-4"
                >
                  <main className="flex items-center gap-4 w-full max-w-[85%]">
                    <div className="flex flex-col gap-2 w-full">
                      <span className="text-xs font-medium">Firstname</span>
                      <input
                        type="text"
                        required
                        name="firstname"
                        value={name.firstname}
                        onChange={(e) =>
                          setName({ ...name, firstname: e.target.value })
                        }
                        className="bg-zinc-50 border border-zinc-200 w-full rounded-xl p-3 px-4 text-xs font-medium placeholder:text-xs placeholder:text-zinc-600 placeholder:font-normal outline-zinc-200 "
                        placeholder="Enter full name"
                      />
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                      <span className="text-xs font-medium">Lastname</span>
                      <input
                        type="text"
                        required
                        name="lastname"
                        value={name.lastname}
                        onChange={(e) =>
                          setName({ ...name, lastname: e.target.value })
                        }
                        className="bg-zinc-50 border border-zinc-200 w-full rounded-xl p-3 px-4 text-xs font-medium placeholder:text-xs placeholder:text-zinc-600 placeholder:font-normal outline-zinc-200 "
                        placeholder="Enter full name"
                      />
                    </div>
                  </main>
                  <button
                    type="submit"
                    disabled={isLoading.name}
                    className="flex text-xs font-medium items-center justify-center gap-2 bg-primary text-white px-8 py-3 rounded-xl outline-none cursor-pointer w-max"
                  >
                    {isLoading.name ? (
                      <span className="spinner h-[15px] w-[15px] border-2 border-white border-b-transparent rounded-full inline-block"></span>
                    ) : (
                      "Save Record"
                    )}
                  </button>
                </form>
              </main>
            )}

            {toggleEmail ? (
              <main className="flex flex-col gap-3 py-4">
                <section className="flex w-full items-center justify-between text-xs py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">
                      Edit email address
                    </span>
                    <p className="text-xs text-zinc-500/90 capitalize font-normal">
                      This will be used for logging in and account recovery.
                    </p>
                  </div>
                  <p
                    className="text-xs font-medium cursor-pointer flex items-center gap-2 border rounded-full border-zinc-200 py-1.5 px-3 text-zinc-500/80"
                    onClick={() => {
                      setToggleEmail(false);
                      setEmailCodeCont(false);
                    }}
                  >
                    Cancel <FaCircleXmark />
                  </p>
                </section>

                {emailCodeCont ? (
                  <form
                    onSubmit={handleEmailChange}
                    className="flex flex-col gap-4"
                  >
                    <div className="flex flex-col gap-2">
                      <span className="text-xs font-medium">Code</span>
                      <input
                        type="text"
                        required
                        name="code"
                        value={emailCode.code}
                        onChange={(e) =>
                          setEmailCode((prev) => ({
                            ...prev,
                            [e.target.name]: e.target.value,
                          }))
                        }
                        className="bg-zinc-50 border border-zinc-200 w-full rounded-xl p-3 px-4 text-xs font-medium placeholder:text-xs placeholder:text-zinc-600 placeholder:font-normal outline-zinc-200 max-w-[85%]"
                        placeholder="Enter code"
                      />
                    </div>
                    <section className="flex items-center gap-4">
                      <button
                        type="submit"
                        disabled={isLoading.emailCode}
                        className="flex text-xs font-medium items-center justify-center gap-2 bg-primary text-white px-8 py-3 rounded-xl outline-none cursor-pointer w-max"
                      >
                        {isLoading.emailCode ? (
                          <span className="spinner h-[15px] w-[15px] border-2 border-white border-b-transparent rounded-full inline-block"></span>
                        ) : (
                          "Confirm"
                        )}
                      </button>
                      <button
                        onClick={handleSendEmailCode}
                        type="button"
                        disabled={isLoading.email}
                        className="flex text-xs items-center justify-center gap-2 text-primary font-semibold border border-primary px-6 h-full rounded-xl outline-none cursor-pointer w-max p-2.5"
                      >
                        {isLoading.email ? (
                          <span className="spinner h-[15px] w-[15px] border-2 border-zinc-950 border-b-transparent rounded-full inline-block"></span>
                        ) : (
                          "Resend code"
                        )}
                      </button>
                    </section>
                  </form>
                ) : (
                  <form
                    onSubmit={handleSendEmailCode}
                    className="flex flex-col gap-4"
                  >
                    <div className="flex flex-col gap-2">
                      <span className="text-xs font-medium">Email address</span>
                      <input
                        type="email"
                        required
                        name="email"
                        value={email.email}
                        onChange={(e) =>
                          setEmail((prev) => ({
                            ...prev,
                            [e.target.name]: e.target.value,
                          }))
                        }
                        className="bg-zinc-50 border border-zinc-200 w-full rounded-xl p-3 px-4 text-xs font-medium placeholder:text-xs placeholder:text-zinc-600 placeholder:font-normal outline-zinc-200 max-w-[85%]"
                        placeholder="Enter email address"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isLoading.email}
                      className="flex text-xs font-medium items-center justify-center gap-2 bg-primary text-white px-8 py-3 rounded-xl outline-none cursor-pointer w-max"
                    >
                      {isLoading.email ? (
                        <span className="spinner h-[15px] w-[15px] border-2 border-white border-b-transparent rounded-full inline-block"></span>
                      ) : (
                        "Save Record"
                      )}
                    </button>
                  </form>
                )}
              </main>
            ) : (
              <section className="flex w-full items-center justify-between text-xs py-4">
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Email Address</span>
                  <p className="text-xs text-zinc-500/90 font-normal">
                    The email address associated with your account
                  </p>
                </div>
                <div className="flex items-end lg:items-center flex-col-reverse lg:flex-row lg:gap-12">
                  <div className="flex flex-col items-end">
                    <p> {email.email}</p>
                    <span className="text-green-500 flex items-center gap-1">
                      Verified <RiPoliceBadgeFill />
                    </span>
                  </div>
                  <p
                    className="text-xs font-medium cursor-pointer flex items-center gap-2 border rounded-full border-zinc-200 py-1.5 px-3 text-zinc-500/80"
                    onClick={() => setToggleEmail(true)}
                  >
                    Edit <FaPencilAlt />
                  </p>
                </div>
              </section>
            )}

            {/* Password Section */}
            {togglePassword ? (
              <main className="flex flex-col gap-3 py-4">
                <section className="flex w-full items-start justify-between text-xs py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">Edit password</span>
                    <p className="text-xs text-zinc-500/90 capitalize font-normal">
                      Password needs to be 8 characters and contain at least one
                      alphabet and one number.
                    </p>
                  </div>

                  <p
                    className="text-xs font-medium cursor-pointer flex items-center gap-2 border rounded-full border-zinc-200 py-1.5 px-3 text-zinc-500/80"
                    onClick={() => setTogglePassword(false)}
                  >
                    Cancel <FaCircleXmark />
                  </p>
                </section>
                <form
                  onSubmit={handlePasswordChange}
                  className="flex flex-col gap-4"
                >
                  <main className="flex flex-col md:flex-row md:items-center gap-4 w-full max-w-[90%]">
                    <div className="flex flex-col gap-2 w-full ">
                      <span className="text-xs font-medium">New password</span>
                      <input
                        type="password"
                        required
                        name="newPassword"
                        value={password.newPassword}
                        onChange={(e) =>
                          setPassword({
                            ...password,
                            newPassword: e.target.value,
                          })
                        }
                        className="bg-zinc-50 border border-zinc-200 w-full rounded-xl p-3 px-4 text-xs font-medium placeholder:text-xs placeholder:text-zinc-600 placeholder:font-normal outline-zinc-200"
                        placeholder="Enter new password"
                      />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                      <span className="text-xs font-medium">
                        Repeat password
                      </span>
                      <input
                        type="password"
                        required
                        name="confirmPassword"
                        value={password.confirmPassword}
                        onChange={(e) =>
                          setPassword({
                            ...password,
                            confirmPassword: e.target.value,
                          })
                        }
                        className="bg-zinc-50 border border-zinc-200 w-full rounded-xl p-3 px-4 text-xs font-medium placeholder:text-xs placeholder:text-zinc-600 placeholder:font-normal outline-zinc-200"
                        placeholder="Repeat password"
                      />
                    </div>
                  </main>
                  <button
                    type="submit"
                    disabled={isLoading.password}
                    className="flex text-xs font-medium items-center justify-center gap-2 bg-primary text-white px-8 py-3 rounded-xl outline-none cursor-pointer w-max"
                  >
                    {isLoading.password ? (
                      <span className="spinner h-[15px] w-[15px] border-2 border-white border-b-transparent rounded-full inline-block"></span>
                    ) : (
                      "Save Record"
                    )}
                  </button>
                </form>
              </main>
            ) : (
              <section className="flex w-full items-center justify-between text-xs py-4">
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Password</span>
                  <p className="text-xs text-zinc-500/90 font-normal">
                    Set a unique password to protect your account
                  </p>
                </div>
                <p
                  onClick={() => setTogglePassword(true)}
                  className="text-xs font-medium cursor-pointer flex items-center gap-2 border rounded-full border-zinc-200 py-1.5 px-3 text-zinc-500/80"
                >
                  Change Password <FaPencilAlt />
                </p>
              </section>
            )}
          </main>
        </section>

        {/* Manage Account and Delete Section (remains the same) */}
        <section className="flex flex-col gap-4 w-full pt-10">
          <h2 className="font-semibold text-lg md:text-xl">Manage account</h2>
          <main className="flex flex-col divide-y divide-zinc-700">
            <section className="flex w-full items-center justify-between text-xs py-4">
              <div className="flex flex-col">
                <span className="text-sm font-medium">Delete account</span>
                <p className="text-xs text-zinc-500/90 font-normal">
                  This will delete your account. Your account will be
                  permanently deleted from RentaHome
                </p>
              </div>
              <p
                onClick={() => setToggleDelete(true)}
                className="text-xs font-medium hover:underline cursor-pointer text-[#f30000]"
              >
                Delete
              </p>
            </section>
          </main>
        </section>
      </section>

      {toggleDelete ? (
        <section className="fixed h-full w-full top-0 left-0 bg-black/60 flex items-center justify-center z-10">
          <section
            className={`flex flex-col items-center gap-6 p-6 pb-4 md:pb-6
               rounded-t-3xl md:rounded-3xl bg-white transition-all delay-75 md:max-w-[450px] w-full fixed md:relative  ${
                 toggleDelete ? "bottom-0" : "-bottom-full"
               } `}
          >
            <h2 className="font-medium text-[16px]">Are you sure?</h2>
            <p className="text-[13px] text-zinc-600 font-normal text-center">
              Deleting your account is permanent and irreversible. You will lose
              all your collections and membership status, if any.
            </p>

            <div className="flex items-center w-full gap-4">
              <span
                onClick={() => setToggleDelete(false)}
                className="flex text-xs items-center justify-center gap-2 border border-zinc-300 text-zinc-950 font-semibold w-full p-2.5 px-6 rounded-xl outline-none cursor-pointer"
              >
                Cancel
              </span>
              <button
                onClick={handleAccountDeletion}
                disabled={isLoading.delete}
                className="flex text-xs items-center justify-center shrink gap-2 text-white bg-[#f30000] font-semibold w-full p-2.5 px-6 rounded-xl outline-none cursor-pointer"
              >
                {isLoading.delete ? (
                  <span className="spinner h-[20px] w-[20px] border-2 border-white border-b-transparent rounded-full inline-block"></span>
                ) : (
                  "Yes, delete my account"
                )}
              </button>
            </div>

            <div
              onClick={() => setToggleDelete(false)}
              className="h-7 w-7 flex items-center justify-center text-sm bg-[#f2f2f2] absolute top-4 right-4 rounded-full cursor-pointer"
            >
              <FaXmark />
            </div>
          </section>
        </section>
      ) : (
        ""
      )}
    </>
  );
}
