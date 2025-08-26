import React, { useEffect, useState } from "react";
import { banner, facebook, google, twitter } from "../assets/images/images";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FaMagento } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../library/firebase";
import axios from "axios";
import toast from "react-hot-toast";
import { updateUser } from "../assets/store/userSlice";
export default function Login() {
  const [disableBtn, setDisableBtn] = useState(false);
  const [googleLoader, setgoogleLoader] = useState(false);
  const [tokenActive, settokenActive] = useState(false);
  const [toggleLoginForm, setToggleLoginForm] = useState(true);
  const userState = useSelector((state) => state.user);
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userRoles = [
    {
      role: "User",
      Route: "/dashboard",
    },
    {
      role: "Agent",
      Route: "/agency",
    },
    {
      role: "Admin",
      Route: "/admin",
    },
  ];

  const [loginInputs, setLoginInputs] = useState({
    email: "",
    code: "",
  });
  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) return;
    const url =
      window.location.hostname === "localhost"
        ? `http://localhost:5000/api/auth/verifytoken`
        : `https://rentahome-server.onrender.com/api/auth/verifytoken`;
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          toast.error(data.message || "Something went wrong", { id: "123" });
          throw new Error(data.message);
        }
        setLoginInputs({
          email: data?.email ?? "",
          code: data?.code ?? "",
        });
        settokenActive(true);
      })
      .catch((err) => {
        console.error("Token verification failed:", err.message);
      });
  }, [searchParams]);

  useEffect(() => {
    const userRole = userRoles.find((r) => r.role === userState?.role);
    if (userState && userRole) navigate(userRole.Route);
  }, [userState]);

  const handleChange = (e) => {
    setLoginInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const sendLoginCode = async (e) => {
    e.preventDefault();
    if (loginInputs.email == "") {
      toast.error("Email address is required", { id: "123" });
      return;
    }
    toast.loading("Logging you in. Please wait...", { id: "123" });
    setDisableBtn(true);
    try {
      const url =
        window.location.hostname === "localhost"
          ? `http://localhost:5000/api/auth/login/code`
          : `https://rentahome-server.onrender.com/api/auth/login/code`;

      const res = await axios.post(url, loginInputs, {
        withCredentials: true,
      });
      const data = res.data;

      if (data.error) {
        toast.error(data.message, { id: "123" });
        setDisableBtn(false);
      } else {
        toast.success(data.message, { id: "123" });
        setDisableBtn(false);
        setToggleLoginForm(false);
      }
    } catch (error) {
      if (error.response?.data) {
        toast.error(
          error.response.data.message ||
            "Unable to login code. Please try again",
          {
            id: "123",
          }
        );
      } else {
        toast.error("An unknown error occured. Please try again.", {
          id: "123",
        });
      }
      setDisableBtn(false);
    }
  };

  const handleLogin = async (e) => {
    if (loginInputs.email == "" || loginInputs.code == "") {
      toast.error("Login code is required", { id: "123" });
      return;
    }
    e.preventDefault();
    toast.loading("Logging you in. Please wait...", { id: "123" });
    setDisableBtn(true);
    try {
      const url =
        window.location.hostname === "localhost"
          ? `http://localhost:5000/api/auth/login`
          : `https://rentahome-server.onrender.com/api/auth/login`;

      const res = await axios.post(url, loginInputs, {
        withCredentials: true,
      });
      const data = res.data;

      if (data.error) {
        toast.error(data.message, { id: "123" });
        setDisableBtn(false);
      } else {
        dispatch(updateUser(data.user));
        toast.success(data.message, { id: "123" });
        setDisableBtn(false);
        setLoginInputs({
          email: "",
          code: "",
        });
        setTimeout(() => {
          setToggleLoginForm(false);
          navigate(0);
        }, 1500);
      }
    } catch (error) {
      if (error.response?.data) {
        toast.error(
          error.response.data.message || "Unable to login. Please try again",
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

  const handleGoogleLogin = async () => {
    setgoogleLoader(true);
    try {
      const url =
        window.location.hostname === "localhost"
          ? `http://localhost:5000/api/auth/google-login`
          : `https://rentahome-server.onrender.com/api/auth/google-login`;

      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (user) {
        setDisableBtn(false);
        setgoogleLoader(false);
        const res = await axios.post(
          url,
          { email: user.email },
          { withCredentials: true }
        );

        const data = res.data;
        if (data.error) {
          toast.error(data.message, { id: "123" });
        } else {
          dispatch(updateUser(data.admin));
          toast.success(data.message, { id: "123" });
          setTimeout(() => {
            setToggleLoginForm(false);
            navigate(0);
          }, 1500);
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
    <>
      <article className="flex h-dvh w-ful ">
        <main className="w-full hidden md:block">
          <img
            src={banner}
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

            {toggleLoginForm && !tokenActive ? (
              <>
                <h1 className="font-semibold text-2xl tracking-tight">
                  Welcome Back to RentaHome!
                </h1>

                <main className="flex flex-col items-center gap-6 w-full ">
                  <form
                    onSubmit={sendLoginCode}
                    className="flex flex-col gap-4 w-full items-center mt-5"
                  >
                    <main className="flex flex-col gap-1 w-full">
                      <label
                        htmlFor=""
                        className="text-sm font-medium text-zinc-500"
                      >
                        Email address
                      </label>
                      <input
                        type="email"
                        required
                        name="email"
                        value={loginInputs.email}
                        onChange={handleChange}
                        className="bg-zinc-100 w-full rounded-xl p-3 px-4 placeholder:text-sm placeholder:font-normal placeholder:text-zinc-400 text-sm outline-zinc-200"
                        placeholder="example@email.com"
                      />
                    </main>
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
                  <div className="flex items-center w-full gap-4 mt-4">
                    <div className="w-full border border-zinc-200"></div>
                    <p className="text-xs text-zinc-500 font-semibold">or</p>
                    <div className="w-full border border-zinc-200"></div>
                  </div>
                  <section className="flex flex-col gap-4 w-full">
                    <span
                      onClick={handleGoogleLogin}
                      className=" rounded-full cursor-pointer border-[1.3px] border-zinc-200 p-2.5 hover:bg-zinc-100 flex items-center gap-2 text-sm font-medium w-full justify-center"
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
                          Continue with Google
                        </>
                      )}
                    </span>
                    <p className="text-[13px] text-zinc-500 font-medium flex items-center gap-1 mx-auto">
                      Don't have an account?
                      <Link
                        to={"/register"}
                        className="font-medium text-primary"
                      >
                        Create one
                      </Link>
                    </p>
                  </section>
                </main>
              </>
            ) : (
              <>
                <div className="flex flex-col text-sm text-zinc-500 mt-4 items-center">
                  <p className="">We send a temporary login code to</p>
                  <p className="font-semibold">{loginInputs.email}</p>
                  <p
                    className=" underline cursor-pointer"
                    onClick={() => {
                      setToggleLoginForm(!toggleLoginForm);
                      setLoginInputs({ code: "" });
                    }}
                  >
                    Not you?
                  </p>
                </div>
                <form
                  onSubmit={handleLogin}
                  className="flex flex-col gap-4 w-full items-center"
                >
                  <main className="flex flex-col gap-1 w-full">
                    <label
                      htmlFor=""
                      className="text-sm font-medium text-zinc-500"
                    >
                      Code sent to email
                    </label>
                    <input
                      type="text"
                      required
                      name="code"
                      value={loginInputs.code}
                      onChange={handleChange}
                      className="bg-zinc-100 w-full rounded-xl p-3 px-4 placeholder:text-sm placeholder:font-normal placeholder:text-zinc-400 text-sm outline-zinc-200"
                      placeholder="Enter login code"
                    />
                  </main>

                  <p className="text-xs text-zinc-500 font-medium flex items-center gap-1">
                    By continuing, you agree to RentaHome's
                    <Link to={"/privacy-policy"} className="underline">
                      Privacy Policy
                    </Link>
                  </p>
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
              </>
            )}
          </section>
        </main>
      </article>
    </>
  );
}
