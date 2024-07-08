"use client"
import { useCollapse } from 'react-collapsed'
import Image from 'next/image'
import { SlArrowDown, SlArrowUp  } from "react-icons/sl";
import sampleHistory from "./sampleHistory";
import { useState } from 'react';
import { history } from "@/types/history";

const CollapsibleList = () => {
    const [expandedItems, setExpandedItems] = useState<{ [key: number]: boolean }>({});
  
    const toggleExpand = (itemId:number) => {
      setExpandedItems(prevState => ({
        ...prevState,
        [itemId]: !prevState[itemId],
      }));
    };
  
    return (
      <>
        {sampleHistory.map(item => (
          <div key={item.id} className="w-full border border-red-200 text-white">
            <div
              onClick={() => toggleExpand(item.id)}
              className='border border-red-300 flex justify-between items-center p-4 bg-gray-100 text-black select-none'
            >
              <span>{expandedItems[item.id] ? 'Collapse' : 'Expand'}</span> 
              {expandedItems[item.id] ? <SlArrowUp className="w-6 h-6 text-primary-500" /> : <SlArrowDown className="w-6 h-6 text-primary-500" />}
            </div>
            {expandedItems[item.id] && (
              <section>
                <div className="border border-red-300 flex flex-col lg:flex-row justify-between items-center p-4 bg-gray-100">
                  <div className="w-full lg:w-1/2 p-2 bg-white border rounded-md mb-4 lg:mb-0">
                    <Image
                      src={item.image}
                      alt="logout"
                      width={50}
                      height={50}
                      className='bg-black'
                    />
                  </div>
                  <div className="border border-red-300 w-full lg:w-1/2 p-2 bg-white text-primary-500 rounded-md">
                    <span>{item.desc}</span>
                  </div>
                </div>
              </section>
            )}
          </div>
        ))}
      </>
    );
  };
  
  export default CollapsibleList;