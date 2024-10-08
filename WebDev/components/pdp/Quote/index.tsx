"use client";
import React from "react";
import SectionTitle from "../Common/SectionTitle";

const Quote = () => {

  return (
    <section className="relative z-10 py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title="Empowering Patients with Medication Knowledge"
          paragraph="Studies suggest, Patients are 50% more likely to take their medications punctually when they understand their purpose and benefits. 
          Clear information builds trust and encourages adherence to treatment."
          center
          mb="80px"
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 z-[-1] h-full w-full bg-[url(/images/video/shape2.svg)] bg-cover bg-center bg-no-repeat"></div>
    </section>
  );
};

export default Quote;
