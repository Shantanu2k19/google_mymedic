"use client";
import React from "react";
import Upload from "@/components/home/upload"
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from 'axios';

const Home = () => {

  const [isUploaded, setIsUploaded] = React.useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  return (
      <>
        <div>
          {isUploaded? <></> : <Upload onFileUpload={setSelectedFile}/>}
        </div>
      </>
  )
}

export default Home;