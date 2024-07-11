"use client";
import React from "react";
import Upload from "@/components/home/upload"

const Home = () => {

  const [isUploaded, setIsUploaded] = React.useState(false);

  return (
      <>
        <div>
          {isUploaded? <></> : <Upload />}
        </div>
      </>
  )
}

export default Home;