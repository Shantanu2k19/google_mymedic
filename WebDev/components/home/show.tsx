"use client";
import React from "react";
import Image from 'next/image'
import { PrescriptionsData, Prescription, ExtraInfoProps } from "@/types/medicine";
import { GiMedicines } from "react-icons/gi";
import { FaCartShopping } from "react-icons/fa6";
import { TbInfoSquare } from "react-icons/tb";
import { MdOutlineDomainVerification } from "react-icons/md";
import { PiRectangleFill } from "react-icons/pi";
import { toast } from 'react-toastify';

interface ChildComponentProps {
  medsData: PrescriptionsData | null;
  setData: React.Dispatch<React.SetStateAction<PrescriptionsData | null>>;
  isHistory: boolean,
}

interface extraInfo_vals{
  item: string,
  value: string
}

interface verification_vals{
  verified: number,
  verification_doc_name: string,
  verification_date: string,
  verification_comment: string,
}

const Show: React.FC<ChildComponentProps> = ({ medsData, setData, isHistory }) => {

  if(medsData==null)
  {
    setData(null);
    return;
  }

  let receivedData: PrescriptionsData = {
      prescriptions: medsData.prescriptions,
      extra_info : medsData.extra_info,
      image_url : medsData.image_url,
      upload_date: medsData.upload_date,
      verification: medsData.verification,
      verification_doc_name: medsData.verification_doc_name,
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

          <div className={`w-full h-screen-80 border-2 border-accent relative rounded-lg bg-light-4 bg-opacity-40 m-4 p-2`}>
              <Image
              src={receivedData.image_url || "/assets/sample"}
              alt="extracted image"
              layout="fill"
              objectFit="contain"
              />
          </div>

          <br/>

          <div className={`border-2 bg-gray-100 m-4 p-2 rounded-lg w-full bg-opacity-90
            ${
              receivedData.verification === 1 ? 'border-green-cs' :
              receivedData.verification === 2 ? 'border-red-cs' :
              'border-yellow-cs'
            }`}>
            <div className="text-black text-heading3-bold py-4 text-center">Extracted Data</div>
            { receivedData && receivedData.prescriptions.map(item=>(
                <Showmeds key={item.name} prop={item} />
            ))}
          </div>


          <div className="border border-white-1 bg-gray-100 m-4 p-2 border rounded-lg w-full bg-opactiy-50 bg-opacity-90">
          <div className='border rounded-lg bg-glassmorphism2 m-3'>
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

          <div className={`border border-white-1 m-4 p-2 rounded-lg w-full bg-opacity-20
            ${
              receivedData.verification === 2 ? 'border-red-cs bg-red-cs' :
              receivedData.verification === 1 ? 'border-green-cs bg-green-cs' :
              'border-yellow-cs bg-yellow-cs'
            }`}>  
          <div className='border rounded-lg bg-light-2 m-3'>
            <div className="text-prim-dark text-body-normal p-2 m-3
            flex justify-between items-center ">
              <div className="flex items-center uppercase">
                <MdOutlineDomainVerification  className="w-6 h-6"/>      
                &nbsp; <u>Verification details</u>
              </div>
            </div>

              { receivedData && 
                <VerificationDetails 
                  verified={receivedData.verification}
                  verification_doc_name={receivedData.verification_doc_name}
                  verification_date={receivedData.verification_date}
                  verification_comment={receivedData.verification_comment}
                />
              }
              
            </div>
          </div>

          {!isHistory && <>
            <br/>

            <button 
                className="button-custom2 w-64 bg-accent"
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

              <br/>
              <br/>
              <hr className="border-t-2 border-dark-1"/>
              <br/>

              The details provided by AI are verified by a certified doctor. Use the information after verification for medical purposes.
              <br/>
              Color codes : 
              <div className="flex flex-row justify-between align-center">
                <span className="flex items-center">
                <PiRectangleFill className="text-yellow-cs w-6 h-6" />
                <span className="ml-2">InProgress</span>
                </span> 

                <span className="flex items-center">
                <PiRectangleFill className="text-green-cs w-6 h-6" />
                <span className="ml-2">Completed</span>
                </span> 

                <span className="flex items-center">
                <PiRectangleFill className="text-red-cs w-6 h-6" />
                <span className="ml-2">Completed with comments</span>
                </span> 
              </div>
            </div>
            
          </>}
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
        <div className='border rounded-lg bg-white m-3'>
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

const VerificationDetails: React.FC<verification_vals> = ({
  verified,
  verification_doc_name,
  verification_date,
  verification_comment,
}) => {

  return (
    <div className="px-4 m-2">
      <div className="grid grid-cols-3 gap-3">
        <span className="text-base1-semibold col-span-1">Verification Progress</span>
        <span className="text-body-semibold text-accent col-span-2">
          {verified === 2 ? "Verification with comments" : verified === 1 ? "Verification success" : "InProgress"}
        </span>
    
        <span className="text-base1-semibold col-span-1">Doctor&apos;s Name</span>
        <span className="col-span-2 text-accent underline cursor-pointer">{verification_doc_name}</span>
    
        <span className="text-base1-semibold col-span-1">Verification Date</span>
        <span className="col-span-2">{verification_date}</span>
    
        <span className="text-base1-semibold col-span-1">Verification Comments</span>
        <span className="col-span-2">{verification_comment}</span>
      </div>
    </div>
  )
}  


export default Show;