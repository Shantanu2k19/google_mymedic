"use client";
import React from "react";
import Upload from "@/components/home/upload"
import Show from "@/components/home/show"
import { PrescriptionsData } from "@/types/medicine";

const Home = () => {
  const [medsdata, setData ] = React.useState<PrescriptionsData | null>(null);
  console.log("changed;;--", medsdata)
  return (
      <>
        <div>
          {
            medsdata? 
              <Show
                isHistory={false}
                medsData={medsdata}
                setData={setData}
              />
              : 
              <Upload 
                setData={setData}
              />
          }
        </div>
      </>
  )
}

export default Home;