import React, { useState } from "react";
import { banner, google } from "../assets/images/images";
import { FaMagento } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowCircleRight } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import toast from "react-hot-toast";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../library/firebase";
export default function Register() {
  const [disableBtn, setDisableBtn] = useState(false);
  const [googleLoader, setgoogleLoader] = useState(false);
  const [userType, setUserType] = useState("");
  const [toggleSignupCont, setToggleSignupCont] = useState(false);
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const [signupInputs, setSignupInputs] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phoneNumber: phone,
    type: "",
  });

  const handleChange = (e) => {
    setSignupInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const userCategory = [
    {
      id: "0001",
      type: "User",
      description: "I want to access features for a User",
      name: "Register as a Buyer or Renter",
    },

    {
      id: "0002",
      type: "Individual Agent",
      description: "I want to access features for an Individual Agent",
      name: "Register as an Agent",
    },

    {
      id: "0003",
      type: "Property Agency",
      description: "I want to access features for a Property Agency",
      name: "Register as an Agency",
    },

    {
      id: "0004",
      type: "Property Owner",
      description: "I want to access features for a Property Owner",
      name: "Register as a Property Owner",
    },
  ];

  const handleSignup = async (e) => {
    e.preventDefault();
    if (signupInputs.type === "" || signupInputs.phoneNumber === "") {
      toast.error("Please select a user type and enter phone number", {
        id: "123",
      });
      return;
    }

    toast.loading("Creating your account. Please wait...", { id: "123" });
    setDisableBtn(true);
    try {
      const url =
        window.location.hostname === "localhost"
          ? `http://localhost:5000/api/auth/signup`
          : `https://rentahome-server.onrender.com/api/auth/signup`;

      const res = await axios.post(url, signupInputs, {
        withCredentials: true,
      });
      const data = res.data;

      if (data.error) {
        toast.error(data.message, { id: "123" });
        setDisableBtn(false);
      } else {
        toast.success(data.message, { id: "123" });
        setDisableBtn(false);
        setSignupInputs({
          firstname: "",
          lastname: "",
          email: "",
          password: "",
        });
        setPhone("");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      if (error.response?.data) {
        toast.error(
          error.response.data.message ||
            "Account creation failed. Please try again",
          {
            id: "123",
          }
        );
      } else {
        toast.error("Something went wrong. Please try again.", { id: "123" });
      }
      setDisableBtn(false);
    }
  };

  const handleGoogleSignup = async () => {
    setgoogleLoader(true);
    try {
      const url =
        window.location.hostname === "localhost"
          ? `http://localhost:5000/api/auth/google/signup`
          : `https://rentahome-server.onrender.com/api/auth/google/signup`;

      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (user) {
        setDisableBtn(false);
        setgoogleLoader(false);
        const res = await axios.post(
          url,
          { email: user.email, firstname: user.displayName, type: userType },
          { withCredentials: true }
        );

        const data = res.data;
        if (data.error) {
          toast.error(data.message, { id: "123" });
        } else {
          toast.success(data.message, { id: "123" });
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        }
      }
    } catch (error) {
      if (error.response?.data) {
        toast.error(
          error.response.data.message ||
            "Google login failed. Please try again",
          {
            id: "123",
          }
        );
      } else {
        toast.error("Something went wrong. Please try again.", { id: "123" });
      }
      setDisableBtn(false);
    }
  };

  return (
    <article className="flex h-dvh w-ful ">
      <main className="w-full hidden md:block">
        <img
          src={banner}
          loading="lazy"
          className="w-full h-full object-cover"
          alt="loginbanner"
        />
      </main>
      <main className="w-full justify-center flex items-center">
        <section className="flex flex-col items-center gap-7 px-8 md:px-12  lg:px-24 w-full">
          <Link to={"/"} className="flex items-center gap-1">
            <span className="h-8 w-8 rounded-lg text-lg bg-primary text-white flex items-center justify-center">
              <FaMagento />
            </span>
            <div className="text-xl font-medium text-primary">RentaHome</div>
          </Link>
          {!toggleSignupCont ? (
            <>
              <div className="flex flex-col w-full items-center gap-1">
                <h1 className="font-semibold text-2xl tracking-tight">
                  How do you want to Sign Up As?
                </h1>
                <p className="text-sm font-medium text-zinc-500">
                  Select User Type
                </p>
              </div>

              <section className="flex flex-col gap-4 w-full">
                {userCategory.map((category, index) => (
                  <section
                    key={category.id}
                    onClick={() => {
                      setToggleSignupCont(true);
                      setUserType(category.type);
                      setSignupInputs((prev) => ({
                        ...prev,
                        type: category.type,
                      }));
                    }}
                    className="p-3 rounded-xl border border-zinc-200 flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-medium">
                        {category.name}
                      </span>
                      <p className="text-xs text-zinc-500">
                        {category.description}
                      </p>
                    </div>
                    <FaArrowCircleRight className="text-primary" />
                  </section>
                ))}
              </section>
            </>
          ) : (
            <section className="w-full">
              <div className="flex flex-col gap-1 items-center w-full">
                <h1 className="font-semibold text-2xl tracking-tight">
                  Sign up on RentaHome!
                </h1>
                <p
                  onClick={() => {
                    setToggleSignupCont(false);
                    setUserType("");
                  }}
                  className="text-[13px] text-zinc-500 font-medium flex items-center gap-1 mx-auto cursor-pointer"
                >
                  Not {userType === "Individual Agent" ? "an" : "a"} {userType}?
                  <span className="font-medium text-primary text-sm">
                    Sign Up As
                  </span>
                </p>
              </div>

              <main className="flex flex-col items-center gap-6 w-full ">
                <form
                  onSubmit={handleSignup}
                  className="flex flex-col gap-3 w-full items-center mt-5"
                >
                  <div className="flex items-center gap-3 w-full">
                    <input
                      type="text"
                      required
                      name="firstname"
                      value={signupInputs.firstname}
                      onChange={handleChange}
                      className="border border-zinc-200 bg-zinc-50 w-full rounded-xl p-2.5 px-4 placeholder:text-xs placeholder:font-normal placeholder:text-zinc-400 text-sm outline-zinc-200"
                      placeholder="Firstname"
                    />
                    <input
                      type="text"
                      required
                      name="lastname"
                      value={signupInputs.lastname}
                      onChange={handleChange}
                      className="border border-zinc-200 bg-zinc-50 w-full rounded-xl p-2.5 px-4 placeholder:text-xs placeholder:font-normal placeholder:text-zinc-400 text-sm outline-zinc-200"
                      placeholder="Lastname"
                    />
                  </div>
                  <input
                    type="email"
                    required
                    name="email"
                    value={signupInputs.email}
                    onChange={handleChange}
                    className="border border-zinc-200 bg-zinc-50 w-full rounded-xl p-2.5 px-5 placeholder:text-xs placeholder:font-normal placeholder:text-zinc-400 text-sm outline-zinc-200"
                    placeholder="Email address"
                  />
                  <div className="w-full">
                    <PhoneInput
                      country={"ng"}
                      value={phone}
                      onChange={(value) => {
                        setPhone(value);
                        setSignupInputs((prev) => ({
                          ...prev,
                          phoneNumber: value,
                        }));
                      }}
                      enableSearch={true}
                      inputClass="!border !border-zinc-200 !bg-zinc-50 !w-full !rounded-xl !py-[21px] focus:!ring-1 focus:!ring-zinc-200 "
                      buttonClass="!border border-zinc-200 bg-zinc-50 !rounded-l-xl !pl-3"
                      containerClass="!w-full"
                    />
                  </div>
                  <input
                    type="password"
                    required
                    name="password"
                    value={signupInputs.password}
                    onChange={handleChange}
                    className="border border-zinc-200 bg-zinc-50 w-full rounded-xl p-2.5 px-4 placeholder:text-xs placeholder:font-normal placeholder:text-zinc-400 text-sm outline-zinc-200"
                    placeholder="Password"
                  />

                  <div className="h-[45px] bg-primary rounded-xl w-full flex items-center justify-center">
                    {disableBtn ? (
                      <span className="spinner h-[15px] w-[15px] border-2 border-white border-b-transparent rounded-full inline-block"></span>
                    ) : (
                      <button className="flex text-sm font-semibold items-center justify-center gap-2 bg-primary text-white w-full px-4 py-3 rounded-xl outline-none cursor-pointer">
                        Continue
                      </button>
                    )}
                  </div>
                </form>

                <section className="flex flex-col gap-4 w-full">
                  <span
                    onClick={handleGoogleSignup}
                    className=" rounded-full cursor-pointer border-[1.3px] border-zinc-200 p-2.5 hover:bg-zinc-100 bg-zinc-50 flex items-center gap-2 text-sm font-medium w-full justify-center"
                  >
                    {googleLoader ? (
                      <span className="spinner h-[15px] w-[15px] border-2 border-zinc-950 border-b-transparent rounded-full inline-block my-1"></span>
                    ) : (
                      <>
                        <img
                          src={google}
                          className="w-[20px]"
                          alt="logo icon"
                        />
                        Create an account using google
                      </>
                    )}
                  </span>
                </section>
              </main>
            </section>
          )}

          <p className="text-[13px] text-zinc-500 font-medium flex items-center gap-1 mx-auto">
            Already have an account?
            <Link to={"/login"} className="font-medium text-primary">
              Sign in
            </Link>
          </p>
        </section>
      </main>
    </article>
  );
}
