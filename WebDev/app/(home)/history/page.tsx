"use client"
import { useCollapse } from 'react-collapsed'
import { FaCaretDown,FaCaretUp } from "react-icons/fa";
import { useState, useEffect, useRef, FormEvent } from 'react'

import { fetchHistory } from '@/app/api/actions/historyAction';
import { PrescriptionsData } from "@/types/medicine";
import { FetchUserHistory } from "@/types/response"
import { ApiResponse } from "@/types/history";
import Show from "@/components/home/show"
import { PiRectangleFill } from "react-icons/pi";
import { useSession } from "next-auth/react";

// import { history } from "@/types/history";

const CollapsibleList  = () => {
  const { data: session, status } = useSession();
  const [data, setData] = useState<PrescriptionsData[]>([]);
  const [defaultMessage, setDefaultMessage] = useState("Loading user's information...");

  useEffect(() => {
    const fetchData = async (usrEmail: string) => {
      try {
        const result:FetchUserHistory = await fetchHistory(usrEmail);

        if (!result.success || result.data === undefined) {
          setDefaultMessage("Unable to fetch history");
          return;
        } 

        if(result.data.length === 0){
          setDefaultMessage("No History found!");
          return;
        }
        
        const responseJson = JSON.parse(result.data);
        console.log('response-->', responseJson);
        if(responseJson.length===0)
        {
          setDefaultMessage("No History Found of User");
          return;
        }

        let tempData: PrescriptionsData[] = responseJson.map((item: ApiResponse) => ({
          prescriptions: item.data_from_llm.medData.prescriptions,
          extra_info: item.data_from_llm.medData.extra_info,
          image_url: item.img_url,
          upload_date: item.upload_date,
          verification: item.verification,
          verification_doc_name: item.verification_doc_name,
          verification_date: item.verification_date,
          verification_comment: item.verification_comment,
        }));

        setData(tempData);
        
      } catch (error) {
        setDefaultMessage("No History Found of User")
      }
    };

    if (status === 'authenticated') {
      if (session.user && session.user.email) {
        fetchData(session.user.email);
      }
    }
          
  }, [status, session?.user?.email]);

  // console.log('data-->', data);
  
  return (
    <>
     {data.length > 0 ? (
        data.map((item, index) => (
          <>
            <CollapseData key={index} prop={item}/>
          </>
        ))
      ) : (
        <p className='text-white'>{defaultMessage}</p>
      )}
    </>
  );
};


const CollapseData = ({prop}: {prop:PrescriptionsData}) => {
  const [medsdata, setData ] = useState<PrescriptionsData | null>(null);

  const config = {
    duration: 300,
  }

  const { getCollapseProps, getToggleProps, isExpanded} = useCollapse(config);
  const verificaition_text = prop.verification===0? "Verification Inprogress": prop.verification===1? "Verification Complete":"Verified With Comments";

  return (
    <div className='bg-gray-200 mb-2 border rounded-md'>
      <div 
        className={`header flex justify-between items-center p-4 bg-gray-200 text-base1-semibold text-black-1 select-none border-dark-1 shadow-up rounded-md`}
        {...getToggleProps()}
      >
        {/* <span>{isExpanded ? 'Collapse' : 'Expand'}</span>  */}
        <div className='flex flex-row items-center'>Extract-{prop.upload_date} &nbsp; <PiRectangleFill className={`${prop.verification===0? "text-yellow-cs": prop.verification===1? "text-green-cs":"text-red-cs"}`} /></div> 
        {isExpanded ? <div className='flex flex-row'>{verificaition_text}<FaCaretUp className="w-6 h-6 text-primary-500" /></div> 
          : <div className='flex flex-row'> {verificaition_text}<FaCaretDown className="w-6 h-6 text-primary-500" /></div>
        }
      </div>

      <div
        {...getCollapseProps()}
      >
        <div className='content border rounded-md'>
          <Show medsData={prop} setData={setData} isHistory={true}/>
        </div>
      </div>

    </div>
  )
};

export default CollapsibleList;