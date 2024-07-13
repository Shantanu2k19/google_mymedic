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

interface ChildComponentProps {
  medsData: PrescriptionsData | null;
  setData: React.Dispatch<React.SetStateAction<PrescriptionsData | null>>;
}

const Show: React.FC<ChildComponentProps> = ({ medsData, setData }) => {

  console.log("data to show-",medsData)

  if(medsData==null) return;

  let lol: PrescriptionsData = {
      prescriptions: medsData.prescriptions
  };
  
  return (
      <>
        <div className="flex flex-col justify-center items-center">

          <div className="w-full h-screen-80 border-2 border-primary-500 relative rounded-lg bg-light-4 bg-opacity-40 m-4 p-2 ">
              <Image
              src="http://localhost:8000/media/user1_max.j_11_07_2024_14_13_05.jpg"
              alt="extracted image"
              layout="fill"
              objectFit="contain"
              />
          </div>

          <br/>

          <div className="border border-white-1 bg-gray-100 m-4 p-2 border rounded-lg w-full bg-opactiy-50 bg-opacity-90">
            <div className="text-black text-heading3-bold py-4 text-center">Extracted Data</div>
            { lol && lol.prescriptions.map(item=>(
                <Showmeds key={item.name} prop={item} />
            ))}
          </div>

          <br/>

          <button 
              className="button-custom2 w-64 bg-primary-500"
              onClick={() => {setData(null)}}
          >
            Extract Another
          </button>

          <br/>
          <br/>

          <div className="text-white bg-dark-4 p-4 m-2 rounded-lg">
            Disclaimer: The medication information generated by AI is intended for informational purposes. 
            It complements, but does not substitute, professional medical advice from healthcare providers. 
            Users are encouraged to consult doctors or pharmacists for personalized guidance.
          </div>
        </div>
      </>
  )
}

const Showmeds = ({prop}: {prop:Prescription}) => {

    const { name, use, dosage, sideeffects, working} = prop;
    
    return (
        <div className='border rounded-lg bg-glassmorphism2 m-3'>
            <div className="text-prim-dark text-body-normal p-2 m-3
            flex justify-between items-center ">
              <div className="flex items-center uppercase">
                <GiMedicines  className="w-6 h-6"/>      
                &nbsp; <u>{name}</u>
              </div>
              <div className="border border-black-1 rounded-lg bg-light-1 px-4 py-1 cursor-pointer">  
                <FaCartShopping className="w-6 h-6"/>
              </div>
            </div>

             <div className="px-4 m-2">
              <div className="grid grid-cols-3 gap-3">
                <span className="text-base1-semibold col-span-1">Usage</span>
                <span className="text-body-semibold text-primary-500 col-span-2">{use}</span>
                
                <span className="text-base1-semibold col-span-1">Dosage</span>
                <span className="col-span-2">{dosage}</span>
                
                <span className="text-base1-semibold col-span-1">Working</span>
                <span className="col-span-2">{working}</span>
                
                <span className="text-base1-semibold col-span-1">Potential side-effects</span>
                <span className="col-span-2">{sideeffects}</span>
              </div>
            </div>
        </div>
    )
}  


export default Show;