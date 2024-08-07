import React from 'react';
import { Triangle } from 'react-loader-spinner'
import { GoDotFill } from "react-icons/go";
import { Doc_info } from "@/types/user"

interface ConsultProps {
  doc_info: Doc_info;
}

export const Consult: React.FC<ConsultProps> = ({ doc_info }) => {
  
  const [isConnecting, setIsConnecting] = React.useState(false);
  const [response, setResponse] = React.useState("Connect with patients now");
  const [online, setOnline] = React.useState(0);

  const handleConnectChat = async() =>{
    if(isConnecting){
      setIsConnecting(false);
      setResponse("Status Idle");
      return;
    }
    setResponse("Waiting for consultation...");
    setIsConnecting(true);


  //   try {
  //     const result:connectWithDocRes = await connectWithDoc();

  //     if (!result.success || result.name === undefined) {
  //       setResponse("No physicians are available right now. We have received your appointment and will contact you soon.");
  //       setIsConnecting(false);
  //     } 
  //   }
  //   catch (e:any){
  //     setResponse("Please try again later");
  //     setIsConnecting(false);
  //   }
  //   return;
  
  }

  return (
      <div className="flex flex-col h-full w-[80%] items-center justify-center text-white text-body-normal">

      <div className='w-full flex flex-col items-start justify-left m-2 p-10'>
        
          <p>Dr. {doc_info.name}</p>
          <p className='text-base-regular'>{doc_info.qualification}</p>

          <br/>
          <div className='flex flex-row items-center'>          
          My Status : &nbsp;
          {isConnecting ? 
          <>
          Online <GoDotFill className='text-green-cs m-2'/>
          </>
          :
          <>
          Idle <GoDotFill className='text-yellow-cs m-2'/>
          </>
          }
          </div>
          Users Online : {online}
      </div>

      {response}
      
      <div className='flex flex-col items-center w-full p-4'>

        { !isConnecting ? <button className="button-custom-doc w-64 h-12" onClick={handleConnectChat}>Connect Now</button>
        : 
        <div className='flex flex-col justify-center items-center text-white'>
          <button className="button-custom-doc w-64 h-12" onClick={handleConnectChat}>Cancel</button>
          <Triangle
              visible={true}
              height="150"
              width="150"
              color="#FFFFFF"
              ariaLabel="triangle-loading"
              wrapperStyle={{}}
              wrapperClass=""
          />
          </div>
        }
      </div>

    </div>
  )
}