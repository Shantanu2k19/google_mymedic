"use client";
import React from "react";
import Upload from "@/components/home/upload"
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from 'axios';

const Home = () => {

  const [data, setData] = React.useState(null);

  return (
      <>
        <div>
          {data ? <> </> : <Upload setData={setData}/>}
        </div>
      </>
  )
}

export default Home;