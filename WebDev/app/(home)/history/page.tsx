"use client"
import { useCollapse } from 'react-collapsed'
import Image from 'next/image'
import { FaCaretDown,FaCaretUp } from "react-icons/fa";
import sampleHistory from "./sampleHistory";
import { history } from "@/types/history";
import { useState, useEffect, useRef, FormEvent } from 'react'

import { fetchHistory } from '@/lib/actions/historyAction';


const CollapsibleList  = () => {
  console.error('fetch1');

// useEffect(() => {
  console.error('fetch2');

  const fetchData = async () => {
  console.error('fetch3');

    try {
      const response = await fetchHistory('user123');
      console.log(response);
    } 
  catch (error: any) {
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

  fetchData();
  console.error('fetch4');

// }, []); 


  return (
    <>
      {/* {sampleHistory.map(item=>(
        <CollapseData key={item.id} prop={item} />
      ))} */}
    </>
  );
};

const CollapseData = ({prop}: {prop:history}) => {
  const { id, desc, image} = prop;

  const config = {
    duration: 300,
  }

  const { getCollapseProps, getToggleProps, isExpanded} = useCollapse(config);

  return (
    <div className='bg-gray-200 mb-1 border rounded-md'>
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
          <div className="border border-red-300 flex flex-col lg:flex-row justify-between items-center p-2 bg-gray-100"> 
            <div className="flex items-center justify-center w-full lg:w-1/2 p-2 mb-4 lg:mb-0">
              <Image
                src={image}
                alt="logout"
                width={50}
                height={50}
                className='bg-black border rounded-md'
              />
            </div>
            <div className="border border-red-300 w-full lg:w-1/2 p-2 bg-white text-black-1 rounded-md">
              <span>{desc}</span>
            </div>
          </div> 
        </div>
      </div>

    </div>
  )
};

export default CollapsibleList;