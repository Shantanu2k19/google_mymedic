"use client";
import React from "react";
import Upload from "@/components/home/upload"
import Show from "@/components/home/show"
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from 'axios';
import { PrescriptionsData, Prescription } from "@/types/medicine";

const Home = () => {

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [medsdata, setData ] = React.useState<PrescriptionsData | null>(null);

  return (
      <>
        <div>
          {
            medsdata? 
              <Show
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