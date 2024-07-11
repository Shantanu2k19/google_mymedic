"use client";
import React from "react";
import Upload from "@/components/home/upload"
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from 'axios';
import Image from 'next/image'
import { PrescriptionsData, Prescription } from "@/types/medicine";
import { GiMedicines } from "react-icons/gi";
import { FaCartShopping } from "react-icons/fa6";
import { TbPoint } from "react-icons/tb";

const Show = () => {

    const [medsdata, setData ] = React.useState<PrescriptionsData | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.get('http://localhost:8000/sampleData/', {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-APIKEY': 'api_key',
          'X-username': 'user123'
        },
        withCredentials: true,
      });
    //   console.log('Response:', response.data.ret.data.medData);
        const lol: PrescriptionsData = {
            prescriptions: response.data.ret.data.medData
        };

      console.log('Type of data:', typeof lol);
      setData(lol)

    } catch (error: any) {
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Error request data:', error.request);
      } 
      console.error('Error message:', error.message);
    }

};


  return (
      <>
        <div className="flex flex-col justify-center items-center">
          <div className="w-full h-screen-60 border-2 border-primary-500 relative rounded-lg bg-light-4 bg-opacity-40 m-4 p-2 ">
              <Image
              src="http://localhost:8000/media/user1_max.j_11_07_2024_14_13_05.jpg"
              alt="extracted image"
              layout="fill"
              objectFit="contain"
              />
          </div>

          <br/>

          <div className="border border-white-1 bg-gray-100 m-4 p-2 border rounded-lg w-full bg-opacity-95">
            <span className="border border-black text-black text-heading3-bold py-4 ">Extracted Data</span>
            <br/>
            <br/>
            { medsdata && medsdata.prescriptions.map(item=>(
                <Showmeds key={item.name} prop={item} />
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="text-white">
            <button type="submit" className="border border-white p-4">getdata</button>
          </form>
      </>
  )
}

const Showmeds = ({prop}: {prop:Prescription}) => {

    const { name, use, dosage, sideeffects, working} = prop;
    
    return (
        <div className='border rounded-lg'>
            <div className="text-prim-dark text-body-normal p-2 m-3
            flex justify-between items-center ">
              <div className="flex items-center">
                <GiMedicines  className="w-6 h-6"/>      
                &nbsp; <u>{name}</u>
              </div>
              <div className="border border-black-1 rounded-lg bg-light-1 px-4 py-1 cursor-pointer">  
                <FaCartShopping className="w-6 h-6"/>
              </div>
            </div>

            <div  className="pl-4 m-2"> 
              <span className="text-">Usage</span> - <span className="text-base1-semibold text-primary-500">{use}</span>
              <br/>
              <span className="text-small-semibold">Dosage</span> - {dosage}
              <br/>
              <span className="text-small-semibold">Working</span> - {working}
              <br/>
              <span className="text-small-semibold">Potential side-effects</span> - {sideeffects}
              <br/>
            </div>
        </div>
    )
}  


export default Show;