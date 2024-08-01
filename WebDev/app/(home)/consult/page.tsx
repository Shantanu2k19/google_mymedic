"use client"
import { Triangle } from 'react-loader-spinner'
import Image from "next/image";
import ChatImage from "@/components/home/chatimage";

export default function hello(){

    return (
        <>
        <ChatImage />
        </>
    )
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