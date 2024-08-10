"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

interface ChildProps {
    toggleComponent: () => void;
    showAlert: (mssg: string, mode: number) => void;
  }
const SignupForm : React.FC<ChildProps> = ({ toggleComponent, showAlert }) => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState<null | string>(null);

  const router = useRouter();

  const inputChangeHandler = (e:any, setItem:any) => {
    error && setError("");
    setItem(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // showAlert("Signing up",2);
    setInfo("Signing up...");

    console.log("form submit")
    const domain = email.split('@')[1];
    if(domain==="mymedicdoc.com")
    {
      setInfo(null);
      setError("Cant use this email!");
      return;
    }

    try {
      const resUserExist = await fetch("api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExist.json();
      if (user) {
        setInfo(null);
        setError("User already exist with this email, Please sign in!");
        return;
      }

      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      console.log("api returned with: " + res.status);
      setInfo(null);
      if (res.ok) {
        const form = e.target;
        console.log("created user success!!");
        showAlert("Signing successful",1);

        // form.reset();

        try {
          const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
          });

          if (!res) {
            setError("Signup failed");
            return;
          }

          if (res.error) {
            setError("Invalid creds");
            return;
          }
          router.replace("/home");
          
          console.log("success..");
        } catch (error) {
          console.log("error loging in :" + error);
        }
      } else {
        console.log("user registration failed");
      }
    } catch (error) {
      console.log("user registration API failed with error:" + error);
    }
  };

  return (
      <div className="flex flex-col justify-center h-screen border border-blue-400 shadow-three mx-auto  min-w-[400px] max-w-[550px] min-h-[640px] max-h-[650px] rounded bg-white px-6 dark:bg-dark sm:p-[40px]">
      <h4 className="mb-3 text-center text-2xl font-bold text-black pb-2 dark:text-white sm:text-3xl">
        Create account
      </h4>
      <button 
        className="border-stroke dark:text-body-color-dark dark:shadow-two mb-6 flex w-full items-center justify-center rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary dark:hover:shadow-none"
        onClick={() => signIn("google", { callbackUrl: '/home' })}
      >
        <span className="mr-3">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_95:967)">
              <path
                d="M20.0001 10.2216C20.0122 9.53416 19.9397 8.84776 19.7844 8.17725H10.2042V11.8883H15.8277C15.7211 12.539 15.4814 13.1618 15.1229 13.7194C14.7644 14.2769 14.2946 14.7577 13.7416 15.1327L13.722 15.257L16.7512 17.5567L16.961 17.5772C18.8883 15.8328 19.9997 13.266 19.9997 10.2216"
                fill="#4285F4"
              />
              <path
                d="M10.2042 20.0001C12.9592 20.0001 15.2721 19.1111 16.9616 17.5778L13.7416 15.1332C12.88 15.7223 11.7235 16.1334 10.2042 16.1334C8.91385 16.126 7.65863 15.7206 6.61663 14.9747C5.57464 14.2287 4.79879 13.1802 4.39915 11.9778L4.27957 11.9878L1.12973 14.3766L1.08856 14.4888C1.93689 16.1457 3.23879 17.5387 4.84869 18.512C6.45859 19.4852 8.31301 20.0005 10.2046 20.0001"
                fill="#34A853"
              />
              <path
                d="M4.39911 11.9777C4.17592 11.3411 4.06075 10.673 4.05819 9.99996C4.0623 9.32799 4.17322 8.66075 4.38696 8.02225L4.38127 7.88968L1.19282 5.4624L1.08852 5.51101C0.372885 6.90343 0.00012207 8.4408 0.00012207 9.99987C0.00012207 11.5589 0.372885 13.0963 1.08852 14.4887L4.39911 11.9777Z"
                fill="#FBBC05"
              />
              <path
                d="M10.2042 3.86663C11.6663 3.84438 13.0804 4.37803 14.1498 5.35558L17.0296 2.59996C15.1826 0.901848 12.7366 -0.0298855 10.2042 -3.6784e-05C8.3126 -0.000477834 6.45819 0.514732 4.8483 1.48798C3.2384 2.46124 1.93649 3.85416 1.08813 5.51101L4.38775 8.02225C4.79132 6.82005 5.56974 5.77231 6.61327 5.02675C7.6568 4.28118 8.91279 3.87541 10.2042 3.86663Z"
                fill="#EB4335"
              />
            </g>
            <defs>
              <clipPath id="clip0_95:967">
                <rect width="20" height="20" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </span>
        Sign in with Google
      </button>

      <div className="mb-8 flex items-center justify-center">
        <span className="hidden h-[1px] w-full max-w-[60px] bg-body-color/50 sm:block"></span>
        <p className="w-full px-1 text-center text-base font-medium text-body-color">
          Or, register with email
        </p>
        <span className="hidden h-[1px] w-full max-w-[60px] bg-body-color/50 sm:block"></span>
      </div>

      <form  onSubmit={handleSubmit}>
        <div className="mb-8">
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
            onChange={(e) => inputChangeHandler(e, setName)}
            onFocus={() => setError("")}
          />
        </div>
        <div className="mb-8">
          <input
            type="email"
            name="email"
            placeholder="Enter your Email"
            className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
            onChange={(e) => inputChangeHandler(e, setEmail)}
            onFocus={() => setError("")}
          />
        </div>
        <div className="mb-8">
          <input
            type="password"
            name="password"
            placeholder="Enter your Password"
            className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
            onChange={(e) => inputChangeHandler(e, setPassword)}
            onFocus={() => setError("")}
          />
        </div>

        <div className="mb-6">
          <button 
            disabled={!password || !email || !name}
            className={`shadow-submit dark:shadow-submit-dark flex w-full items-center justify-center rounded-sm bg-primary px-9 py-4 text-base font-medium 
              text-white duration-300"
              ${
                !password || !email || !name
                  ? "opacity-50 cursor-not-allowed px-6 py-2 rounded-md"
                  : "hover:bg-primary/90"
              }`}
          >
            Sign up
          </button>
          {error && (
            <div
              className="flex flex-col items-center justify-center w-full text-sm
                px-3 py-1 mt-2 text-red-cs "
            >
              {error}
            </div>
          )}
          {info && (
            <div
              className="flex flex-col items-center justify-center w-full text-sm
                px-3 py-1 mt-2 text-white "
            >
              {info}
            </div>
          )}
        </div>
      </form>

      <div onClick={(toggleComponent)} className="text-center text-base font-medium text-body-color">
        Already using Startup?{" "}
        <div className="cursor-pointer text-primary hover:underline">
          Log in
        </div>
      </div>

    </div>
  )
}

export default SignupForm;