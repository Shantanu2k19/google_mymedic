"use client"
import { Triangle } from 'react-loader-spinner'
import Image from "next/image";
import ChatImage from "@/components/home/chatimage";

export default function Chat(){
    return (
        <div
          className='flex flex-row fixed overflow-hidden
            h-full top-0 left-0 w-full justify-between'>
          
          {/* left */}
          <div className='p-0 md:p-14 lg:p-28'></div>
          
          {/* middle */}
          <div className='flex flex-col justify-between flex-grow'>
            
            {/* top */}
            <div className='p-8'></div>
            
            {/* content */}
            <div className='flex flex-col h-full flex-wrap w-full'>
              <ChatImage />
            </div>
            
            {/* bottom */}
            <div className='p-9 sm:p-12 md:p-0 lg:p-0'></div>
          </div>
          
          {/* right */}
          <div className='p-0'></div>
        </div>
      );      
}

/*
 <div className='flex flex-col justify-center items-center text-white'>
            <Triangle
                visible={true}
                height="200"
                width="200"
                color="#877EFF"
                ariaLabel="triangle-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />

            <span>
                Coming soon...
            </span>
        </div>
*/