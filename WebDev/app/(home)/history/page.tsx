"use client"
import { useCollapse } from 'react-collapsed'
import { FaCaretDown,FaCaretUp } from "react-icons/fa";
import { useState, useEffect, useRef, FormEvent } from 'react'

import { fetchHistory } from '@/app/api/actions/historyAction';
import { PrescriptionsData } from "@/types/medicine";
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
    const fetchData = async (usrName: string) => {
      try {
        const response = await fetchHistory(usrName);
        // console.log(response);

        if(response == null)
        {
          setDefaultMessage("No History Found of User")
          return;
        }

        const responseJson = JSON.parse(response.ret);
        console.log('response-->', responseJson);

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
      if (session.user && session.user.name) {
        fetchData(session.user.name);
      }
    }
          
  }, [status]);

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

  return (
    <div className='bg-gray-200 mb-2 border rounded-md'>
      <div 
        className={`header flex justify-between items-center p-4 bg-gray-200 text-base1-semibold text-black-1 select-none border-dark-1 shadow-up rounded-md`}
        {...getToggleProps()}
      >
        {/* <span>{isExpanded ? 'Collapse' : 'Expand'}</span>  */}
        <div className='flex flex-row items-center'>Extract-{prop.upload_date} &nbsp; <PiRectangleFill className={`${prop.verification===0? "text-yellow-cs": prop.verification===1? "text-green-cs":"text-red-cs"}`} /></div> 
        {isExpanded ? <FaCaretUp className="w-6 h-6 text-primary-500" /> : <FaCaretDown className="w-6 h-6 text-primary-500" />}
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