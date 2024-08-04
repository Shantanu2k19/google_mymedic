"use client"
import React from 'react';
import { useSession } from "next-auth/react";
import { fetchVerificationList } from "@/app/api/actions/docAction"
import { FetchVerifyList } from "@/types/response"
import { useState, useEffect } from "react";
import { PrescriptionsData } from "@/types/medicine";
import { ApiResponseVerifyList } from "@/types/history";
import { useCollapse } from 'react-collapsed';
import { PiRectangleFill } from "react-icons/pi";
import { FaCaretDown,FaCaretUp } from "react-icons/fa";
import VerifyList from "@/components/home/doc/verifyList"
import { VerifyListData } from "@/types/response"

const ShowVerificatonList = () => {
  const { data: session, status } = useSession();
  const [data, setData] = useState<VerifyListData[]>([]);
  const [ mssg, setMssg] = useState("Loading information...");

    useEffect(() => {
    
      const fetchData = async (usrEmail: string) => {
        try {
          const result:FetchVerifyList = await fetchVerificationList(usrEmail);
  
          if (!result.success || result.data === undefined) {
            setMssg("Unable to fetch history");
            return;
          } 

          if(result.data.length === 0){
            setMssg("No Extracted prescriptions found!");
            return;
          }
          
          const responseJson = JSON.parse(result.data);
          console.log('response-->', responseJson);
          if(responseJson.length===0)
          {
            setMssg("No Extracted prescriptions found");
            return;
          }

          let tempData: VerifyListData[] = responseJson.map((item: ApiResponseVerifyList) => ({
            prescriptions: item.data_from_llm.medData.prescriptions,
            extra_info: item.data_from_llm.medData.extra_info,
            image_url: item.img_url,
            upload_date: item.upload_date,
            file_name: item.file_name,
          }));

          setData(tempData);
          
        } catch (error) {
          setMssg("No Extracted prescriptions found at the moment")
        }
      };

      if (session && status === 'authenticated' && session.user && session.user.email) 
        fetchData(session.user.email);
    },[status]);
  
    return(
        <>
        {data.length > 0 ? (
        data.map((item, index) => (
          <>
            <CollapseData key={index} prop={item}/>
          </>
        ))
      ) : (
        <p className='text-white'>{mssg}</p>
      )}
        </>
    )
}



const CollapseData = ({prop}: {prop:VerifyListData}) => {
  const [medsdata, setData ] = useState<VerifyListData | null>(null);

  const config = {
    duration: 300,
  }

  const { getCollapseProps, getToggleProps, isExpanded} = useCollapse(config);

  return (
    <div className={`bg-gray-200 mb-2 border rounded-md ${isExpanded && 'mb-14'}`}>
      <div 
        className={`header flex justify-between items-center p-4 bg-gray-200 text-base1-semibold text-black-1 select-none border-dark-1 shadow-up rounded-md`}
        {...getToggleProps()}
      >
        {/* <span>{isExpanded ? 'Collapse' : 'Expand'}</span>  */}
        <div className='flex flex-row items-center'>Extract-{prop.upload_date}</div> 
        {isExpanded ? <div className='flex flex-row'>{medsdata?.upload_date}<FaCaretUp className="w-6 h-6 text-accent" /></div> 
          : <div className='flex flex-row'> {medsdata?.upload_date}<FaCaretDown className="w-6 h-6 text-accent" /></div>
        }
      </div>

      <div
        {...getCollapseProps()}
      >
        <div className='content border rounded-md'>
          <VerifyList medsData={prop} setData={setData}/>
        </div>
      </div>

    </div>
  )
};


export default ShowVerificatonList;