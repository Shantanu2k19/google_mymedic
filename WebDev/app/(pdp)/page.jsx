import React from "react";

import AboutSectionTwo from "@/components/pdp/About/AboutSectionTwo";
import Technologies from "@/components/pdp/Technologies";
import ScrollUp from "@/components/pdp/Common/ScrollUp";
import Features from "@/components/pdp/Features";
import Hero from "@/components/pdp/Hero";
import Quote from "@/components/pdp/Quote";

import "@/styles/index.css";

export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
      <Features />
      <Technologies />
      <AboutSectionTwo />
      <Quote />
    </>
  );
}