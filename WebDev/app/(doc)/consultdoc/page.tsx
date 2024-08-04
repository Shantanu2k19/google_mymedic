"use client"
import React from 'react';
import { useSession } from "next-auth/react";
import { Doc_info } from "@/types/user"
import { Consult } from "@/components/home/doc/consult"
import { fetchDocInfo } from "@/app/api/actions/docConsultAction"
import { ErrorResponse } from "@/types/response"
import { useState, useEffect } from "react";

export default function Chat(){
    
    const { data: session, status } = useSession();
    const [ doc_info, setDocInfo] = useState<Doc_info>();
    const [ mssg, setMssg] = useState("Loading information...");

    useEffect(() => {
        const fetchDocData = async (email:string) => {
          console.log("fetching setData")
          try{
            const response = await fetchDocInfo(email);
            
            if(!response){
              setMssg("Unable to fetch data, No response from server!");
              return null;
            }
            console.log("data", response)
           
            if ((response as ErrorResponse).error) {
              console.error("Error occurred:", (response as ErrorResponse).error);
              setMssg("Error, Unable to fetch data!");
              return null;
            }

            if ('error' in response) {
              console.log(response.error);
              setMssg("Error, Unable to fetch data!");
            } else {
              setDocInfo(response);
            }
            return;
          }
          catch (error: any) {
            console.log("Error fetching data",error);
            setMssg("Unable to fetch data!");
          }
        }

      if (session && status === 'authenticated' && session.user && session.user.email) 
        fetchDocData(session.user.email);
    },[status]);
  
    return(
        <section className="bg-dark-2 flex flex-col items-center justify-center text text-white rounded-lg p-5">
        {doc_info ? (
            <Consult 
              doc_info = {doc_info}
            />
        ) : (
            <p>{mssg}</p>
        )}
        </section>
    )
}