"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image'
import { Prescription } from "@/types/medicine";
import { GiMedicines } from "react-icons/gi";
import { FaCartShopping } from "react-icons/fa6";
import { TbInfoSquare } from "react-icons/tb";
import { MdOutlineDomainVerification } from "react-icons/md";
import { toast } from 'react-toastify';
import { VerifyListData } from "@/types/response"

interface ChildComponentProps {
  medsData: VerifyListData | null;
  setData: React.Dispatch<React.SetStateAction<VerifyListData | null>>;
}

interface extraInfo_vals{
  item: string,
  value: string
}

const VerifyList: React.FC<ChildComponentProps> = ({ medsData, setData }) => {

  if(medsData==null)
  {
    setData(null);
    return;
  }

  let receivedData: VerifyListData = {
      prescriptions: medsData.prescriptions,
      extra_info : medsData.extra_info,
      image_url : medsData.image_url,
      upload_date: medsData.upload_date,
      file_name :  medsData.file_name,
      verification: medsData.verification,
      verification_date: medsData.verification_date,
      verification_comment: medsData.verification_comment,
  };

  if(!receivedData.prescriptions)
  {
    console.log("no prescription data found");
    setData(null);
    return;
  }

  return (
      <>
        <div className="flex flex-col justify-center items-center">

          <div className={`w-full h-screen-80 border-2 border-accent relative rounded bg-light-4 bg-opacity-40 m-4 p-2`}>
              <Image
              src={receivedData.image_url || "/assets/sample"}
              alt="extracted image"
              layout="fill"
              objectFit="contain"
              />
          </div>

          <br/>

          <div className="border-2 bg-gray-100 m-4 p-2 rounded-lg w-full bg-opacity-90">
            <div className="text-black text-heading3-bold py-4 text-center">Extracted Data</div>
            { receivedData && receivedData.prescriptions.map(item=>(
                <Showmeds key={item.name} prop={item} />
            ))}
          </div>


          <div className="border border-white-1 bg-gray-100 m-4 p-2 border rounded-lg w-full bg-opactiy-50 bg-opacity-90">
          <div className='border rounded-lg bg-glassmorphism2 my-3'>
          
            <div className="text-prim-dark text-body-normal p-2 m-3
            flex justify-between items-center ">
              <div className="flex items-center uppercase">
                <TbInfoSquare  className="w-6 h-6"/>      
                &nbsp; <u>Extra Info</u>
              </div>
            </div>

              {receivedData.extra_info && Object.entries(receivedData.extra_info).map(([key, value], index) => (
                  <ShowExtraInfo key={index} item={key} value={value}/>
              ))}

            </div>
          </div>
        
        { receivedData.verification === 0 ? (
        <div className="border border-white-1 rounded-lg w-full bg-opacity-20 border-accent-doc">  
          <div className='border rounded-lg bg-light-2'>
            <div className="text-prim-dark text-body-normal p-2 m-3
            flex justify-between items-center ">
              <div className="flex items-center uppercase">
                <MdOutlineDomainVerification  className="w-6 h-6"/>      
                &nbsp; <u>Verify This Document</u>
              </div>
            </div>
            <Verify file_name={receivedData.file_name}/>
            </div>
          </div>
        ) : 
        (<div className="border border-white-1 rounded-lg w-full bg-opacity-20 border-accent-doc">  
          <div className='border rounded-lg bg-light-2'>
            <div className="text-prim-dark text-body-normal p-2 m-3
            flex justify-between items-center ">
              <div className="flex items-center uppercase">
                <MdOutlineDomainVerification  className="w-6 h-6"/>      
                &nbsp; <u>Verification Comment</u>
              </div>
            </div>
            
            <p className='text-black text-black min-h-[64px] p-3 bg-light-1 m-2 rounded-lg bg-opacity-80'>
            {receivedData.verification_comment ? receivedData.verification_comment : "No comment"}
            </p>
            </div>
          </div>
        )}

        </div>
      </>
  )
}

const Showmeds = ({prop}: {prop:Prescription}) => {

    const { name, use, dosage, sideeffects, working} = prop;

    function showAlert(mssg: string, mode:number) {
      console.log("alert", mssg, mode)
  
      toast.info(mssg, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    const shopMedicine = () => {
      showAlert("Coming soon", 1);
    }
    
    return (
        <div className='border rounded-lg bg-white my-3'>
            <div className="text-prim-dark text-body-normal p-2 m-3
            flex justify-between items-center ">
              <div className="flex items-center uppercase">
                <GiMedicines  className="w-6 h-6"/>      
                &nbsp; <u>{name}</u>
              </div>
              <div 
                className="border border-black-1 rounded-lg bg-light-1 px-4 py-1 cursor-pointer" 
                onClick={shopMedicine}
              >  
                <FaCartShopping className="w-6 h-6"/>
              </div>
            </div>

             <div className="px-4 m-2">
              <div className="grid grid-cols-3 gap-3">
                <span className="text-base1-semibold col-span-1">Usage</span>
                <span className="text-body-semibold text-accent col-span-2">{use}</span>
                
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

const breakCamelCase = (str:string) => {
  // Using regex to split on capital letters and spaces
  return str.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/([A-Z])([A-Z][a-z])/g, '$1 $2');
};

const ShowExtraInfo : React.FC<extraInfo_vals> = ({item, value}) => {
  return (
    <div className="px-4 m-2">
      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-1">
          <span className="text-base1-semibold">{breakCamelCase(item)}</span>
        </div>
        <div className="col-span-2">
          <span className="break-words">{value}</span>
        </div>
      </div>
    </div>
  )
}  

const Verify : React.FC<{file_name : string}> = ({ file_name }) => {

    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
      setInputValue(event.target.value);
    };
  
    const handleSubmit = (event: FormEvent) => {
      event.preventDefault();
      alert(`Form submitted with input: ${file_name}`);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center p-3">
            <textarea
                value={inputValue}
                onChange={handleInputChange}
                placeholder="No Issue Observed. Extraction is good."
                className="p-2 border rounded h-64 w-full"
            />
            <button type="submit" className="button-custom-doc w-64">
                Submit Verification
            </button>
        </form>
    )
}
export default VerifyList;