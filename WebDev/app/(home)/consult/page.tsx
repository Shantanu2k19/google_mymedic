"use client"
import {ChatImage, HandleChat} from "@/components/home/consult";

export default function Chat(){
    
    return (
        <div
          className='flex flex-row fixed overflow-hidden
            h-full top-0 left-0 w-full justify-between'>
          
          {/* left */}
          <div className='p-0 md:p-12 lg:p-26'></div>
          
          {/* middle */}
          <div className='flex flex-col justify-between flex-grow'>
            
            {/* top */}
            <div className='p-8'></div>
            
            {/* content */}
            <div className='bg-white flex flex-col h-full flex-wrap w-full text-black'>
               <div className="relative w-full h-full">
                    
                    {/* Bottom div */}
                    <div className="absolute inset-0 z-10 bg-black">
                    <ChatImage /> 
                    </div>
                    
                    {/* Middle div */}
                    <div className="absolute inset-0 z-20 backdrop-blur-md"></div>
                    
                    {/* Top div */}
                    <div className="absolute inset-0 bg-opacity-0 z-30 text-white">
                    <HandleChat/>
                    </div>
                </div>
            </div>
            
            {/* bottom */}
            <div className='p-9 sm:p-12 md:p-0 lg:p-0'></div>
          </div>
          
          {/* right */}
          <div className='p-0'></div>
        </div>
      );      
}