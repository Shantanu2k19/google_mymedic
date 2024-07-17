"use client"
import { useCollapse } from 'react-collapsed'
import Image from 'next/image'
import { FaCaretDown,FaCaretUp } from "react-icons/fa";
import sampleHistory from "./sampleHistory";
import { history } from "@/types/history";
import { useState, useEffect, useRef, FormEvent } from 'react'

import { fetchHistory } from '@/lib/actions/historyAction';
import { PrescriptionsData, Prescription } from "@/types/medicine";
import { ApiResponse } from "@/types/history";
import Show from "@/components/home/show"

const CollapsibleList  = () => {

  const [data, setData] = useState<PrescriptionsData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchHistory('user123');
        console.log(response);

        const responseJson = JSON.parse(response.ret);
        console.log('response-->', responseJson);

        let tempData: PrescriptionsData[] = responseJson.map((item: ApiResponse) => ({
          prescriptions: item.data_from_llm.medData.prescriptions,
          extra_info: item.data_from_llm.medData.extra_info,
          image_url: item.img_url,
        }));

        setData(tempData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  console.log('data-->', data);

  return (
    <>
      {data && data.map((item) => (
        <>
          <CollapseData prop={item}/>
        </>
      ))}
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
        <span>{isExpanded ? 'Collapse' : 'Expand'}</span> 
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