"use client";
import Image from 'next/image'
import { signIn } from "next-auth/react";
import React from "react";

import { useTheme } from "next-themes"; 
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';

const Hero = () => {

  const { theme, setTheme } = useTheme();
  const router = useRouter();

  function showAlert(mssg: string, mode:number) { console.log(theme)
    console.log("toast-", mssg)
    toast.dismiss();
    if (mode == 1) {
      toast.success(mssg, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme
      });
    } else if (mode == 2) {
      toast.info(mssg, {
        position: "top-center",
        autoClose: 20000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme,
      });
    } else {
      toast.error(mssg, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme,
      });
    }
  }

  const demoLogin = async () => {
    showAlert("Signing in!",2);
    try {
      const res = await signIn("credentials", {
        email:"demo@gmail.com",
        password:"demo_user",
        redirect: false,
      });
      console.log(res);

      if (!res) {
        showAlert("Sign in failed",3);
        return;
      }

      if (res.error) {
        console.log(res.error);
        showAlert("Sign in failed",3);
        return;
      }

      showAlert("Login success",1);
      console.log(res); 

      router.replace("/home");
    } catch (error) {
      showAlert("Sign in failed",3);
      console.log(error+"");
    }
  }

  return (
    <>
      <section
        id="sectionHome"
        className="relative z-10 overflow-hidden bg-white pb-16 pt-[120px] dark:bg-gray-dark md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px] "
      >
       <div className="container ">
        <div className="-mx-4 flex flex-wrap">
          
          {/* Left column (full width on smaller screens, half on larger screens) */}
          <div className="w-full md:w-1/2 px-4 mb-4 md:mb-0">
            <div className="text-center h-full flex flex-col items-center justify-center">

              <span className="mb-5 leading-tight text-black dark:text-white sm:leading-tight md:leading-tight">
                <h1 className="text-pdp-heading1-sm sm:text-pdp-heading1-main" >Discover <span>Mymedic</span> </h1> 

                <h1 className="text-pdp-heading2-sm sm:text-pdp-heading2-main" > Your personal prescription assistant </h1>
              </span>


              <p className="mb-12 leading-relaxed text-body-color dark:text-body-color-dark text-pdp-desc-sm sm:text-pdp-desc-main">
                Easily upload your doctor&apos;s prescription, explore prescribed medicines, understand their uses and dosages, and learn how they benefit you.
                <br/>Simplifying healthcare, one prescription at a time.
              </p>
              <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <div
                  className="rounded-sm bg-accent px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-accent/80 cursor-pointer"
                  onClick={demoLogin}
                >
                  Try Demo 🔥
                </div>

                
                <ScrollLink
                  to="sectionSignupLogin"
                  spy={true}
                  smooth={true}
                  offset={-70} 
                  duration={500}
                >
                  <div
                    className="inline-block rounded-sm bg-black px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-black/90 dark:bg-white/10 dark:text-white dark:hover:bg-white/5 cursor-pointer md:hidden"
                  >
                    Login / SignUp
                  </div>
                </ScrollLink> 

              </div>
            </div>
          </div>
          
          {/* Right column (full width on smaller screens, half on larger screens) */}
          <div className="w-full md:w-1/2 px-4 ">
            <div className="h-full flex flex-col items-center justify-center">
              <Image
                src="/images/mainImg/nogen5.svg"
                alt="ai pharmacist"
                width={500}
                height={500}
                className="image-container"
              />
            </div>
          </div>

      </div>
    </div>

        {/* righ circles */}
        <div className="absolute right-0 top-0 z-[-1] opacity-30 lg:opacity-100">
          <svg
            width="450"
            height="556"
            viewBox="0 0 450 556"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="277"
              cy="63"
              r="225"
              fill="url(#paint0_linear_25:217)"
            />
            <circle
              cx="17.9997"
              cy="182"
              r="18"
              fill="url(#paint1_radial_25:217)"
            />
            <circle
              cx="76.9997"
              cy="288"
              r="34"
              fill="url(#paint2_radial_25:217)"
            />
            <circle
              cx="325.486"
              cy="302.87"
              r="180"
              transform="rotate(-37.6852 325.486 302.87)"
              fill="url(#paint3_linear_25:217)"
            />
            <circle
              opacity="0.8"
              cx="184.521"
              cy="315.521"
              r="132.862"
              transform="rotate(114.874 184.521 315.521)"
              stroke="url(#paint4_linear_25:217)"
            />
            <circle
              opacity="0.8"
              cx="356"
              cy="290"
              r="179.5"
              transform="rotate(-30 356 290)"
              stroke="url(#paint5_linear_25:217)"
            />
            <circle
              opacity="0.8"
              cx="191.659"
              cy="302.659"
              r="133.362"
              transform="rotate(133.319 191.659 302.659)"
              fill="url(#paint6_linear_25:217)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_25:217"
                x1="-54.5003"
                y1="-178"
                x2="222"
                y2="288"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#11A9C0" />
                <stop offset="1" stopColor="#11A9C0" stopOpacity="0" />
              </linearGradient>
              <radialGradient
                id="paint1_radial_25:217"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(17.9997 182) rotate(90) scale(18)"
              >
                <stop offset="0.145833" stopColor="#11A9C0" stopOpacity="0" />
                <stop offset="1" stopColor="#11A9C0" stopOpacity="0.08" />
              </radialGradient>
              <radialGradient
                id="paint2_radial_25:217"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(76.9997 288) rotate(90) scale(34)"
              >
                <stop offset="0.145833" stopColor="#11A9C0" stopOpacity="0" />
                <stop offset="1" stopColor="#11A9C0" stopOpacity="0.08" />
              </radialGradient>
              <linearGradient
                id="paint3_linear_25:217"
                x1="226.775"
                y1="-66.1548"
                x2="292.157"
                y2="351.421"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#11A9C0" />
                <stop offset="1" stopColor="#11A9C0" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint4_linear_25:217"
                x1="184.521"
                y1="182.159"
                x2="184.521"
                y2="448.882"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#11A9C0" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint5_linear_25:217"
                x1="356"
                y1="110"
                x2="356"
                y2="470"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#11A9C0" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint6_linear_25:217"
                x1="118.524"
                y1="29.2497"
                x2="166.965"
                y2="338.63"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#11A9C0" />
                <stop offset="1" stopColor="#11A9C0" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        {/* left designs */}
        <div className="absolute bottom-0 left-0 z-[-1] opacity-30 lg:opacity-100">
          <svg
            width="364"
            height="201"
            viewBox="0 0 364 201"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.88928 72.3303C33.6599 66.4798 101.397 64.9086 150.178 105.427C211.155 156.076 229.59 162.093 264.333 166.607C299.076 171.12 337.718 183.657 362.889 212.24"
              stroke="url(#paint0_linear_25:218)"
            />
            <path
              d="M-22.1107 72.3303C5.65989 66.4798 73.3965 64.9086 122.178 105.427C183.155 156.076 201.59 162.093 236.333 166.607C271.076 171.12 309.718 183.657 334.889 212.24"
              stroke="url(#paint1_linear_25:218)"
            />
            <path
              d="M-53.1107 72.3303C-25.3401 66.4798 42.3965 64.9086 91.1783 105.427C152.155 156.076 170.59 162.093 205.333 166.607C240.076 171.12 278.718 183.657 303.889 212.24"
              stroke="url(#paint2_linear_25:218)"
            />
            <path
              d="M-98.1618 65.0889C-68.1416 60.0601 4.73364 60.4882 56.0734 102.431C120.248 154.86 139.905 161.419 177.137 166.956C214.37 172.493 255.575 186.165 281.856 215.481"
              stroke="url(#paint3_linear_25:218)"
            />
            <circle
              opacity="0.8"
              cx="214.505"
              cy="60.5054"
              r="49.7205"
              transform="rotate(-13.421 214.505 60.5054)"
              stroke="url(#paint4_linear_25:218)"
            />
            <circle cx="220" cy="63" r="43" fill="url(#paint5_radial_25:218)" />
            <defs>
              <linearGradient
                id="paint0_linear_25:218"
                x1="184.389"
                y1="69.2405"
                x2="184.389"
                y2="212.24"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#11A9C0" stopOpacity="0" />
                <stop offset="1" stopColor="#11A9C0" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_25:218"
                x1="156.389"
                y1="69.2405"
                x2="156.389"
                y2="212.24"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#11A9C0" stopOpacity="0" />
                <stop offset="1" stopColor="#11A9C0" />
              </linearGradient>
              <linearGradient
                id="paint2_linear_25:218"
                x1="125.389"
                y1="69.2405"
                x2="125.389"
                y2="212.24"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#11A9C0" stopOpacity="0" />
                <stop offset="1" stopColor="#11A9C0" />
              </linearGradient>
              <linearGradient
                id="paint3_linear_25:218"
                x1="93.8507"
                y1="67.2674"
                x2="89.9278"
                y2="210.214"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#11A9C0" stopOpacity="0" />
                <stop offset="1" stopColor="#11A9C0" />
              </linearGradient>
              <linearGradient
                id="paint4_linear_25:218"
                x1="214.505"
                y1="10.2849"
                x2="212.684"
                y2="99.5816"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#11A9C0" />
                <stop offset="1" stopColor="#11A9C0" stopOpacity="0" />
              </linearGradient>
              <radialGradient
                id="paint5_radial_25:218"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(220 63) rotate(90) scale(43)"
              >
                <stop offset="0.145833" stopColor="white" stopOpacity="0" />
                <stop offset="1" stopColor="white" stopOpacity="0.08" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </section>
    </>
  );
};

export default Hero;
