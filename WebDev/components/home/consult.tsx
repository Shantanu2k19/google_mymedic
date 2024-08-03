import React from 'react';
import { Triangle } from 'react-loader-spinner'
import { connectWithDoc } from '@/app/api/actions/chatAction';
import { connectWithDocRes } from "@/types/response"

interface MessageLightProps {
  prop: number;
}

export const ChatImage = () => {
  return (
    <div className="rounded-lg relative flex flex-col bg-dark-3 w-full overflow-hidden justify-between text-white h-full">
      
      {/* Chat Content */}
      <div className="relative flex flex-col bg-dark-3 text-light-1 w-full h-full overflow-hidden">
        
        {/* Chat Header */}
        <div className="flex items-center p-4 bg-dark-4 bg-opacity-60 rounded-t-lg backdrop-blur-md">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-600 rounded-full"></div>
            <div>
              <h2 className="text-lg font-semibold">Doc Elon Musk</h2>
              <p className="text-sm text-gray-400">Online</p>
            </div>
          </div>
          <div className="ml-auto flex space-x-2">
            <button className="w-8 h-8 bg-gray-600 rounded-full"></button>
            <button className="w-8 h-8 bg-gray-600 rounded-full"></button>
          </div>
        </div>

        {/* Chat Body */}
        <div className="flex-1 p-4 space-y-4 bg-dark-1 bg-opacity-60 backdrop-blur-md overflow-hidden">
          
          <div className="flex space-x-4 justify-end">
            <div className="bg-gray-600 text-white p-4 rounded-lg w-[70%]">
              <MessageDark prop={0.9} />
              <MessageDark prop={0.7} />
            </div>
            <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
          </div>

          <div className="flex space-x-4">
            <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
            <div className="bg-accent text-white p-4 rounded-lg w-3/5">
              <MessageLight prop={0.9} />
            </div>
          </div>

          <div className="flex space-x-4 justify-end">
            <div className="flex flex-col items-end bg-gray-600 text-white p-4 rounded-lg w-3/5">
              <MessageDark prop={0.9} />
              <MessageDark prop={0.3} />
            </div>
            <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
          </div>

          <div className="flex space-x-4">
            <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
            <div className="bg-accent text-white p-4 rounded-lg w-[50%]">
              <MessageLight prop={0.9} />
              <MessageLight prop={0.3} />
            </div>
          </div>

          <div className="space-x-4 justify-end flex sm:hidden md:hidden lg:flex">
            <div className="bg-gray-600 text-white p-4 rounded-lg w-[70%]">
              <MessageDark prop={0.9} />
              <MessageDark prop={0.7} />
            </div>
            <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
          </div>

          {/* Uncomment if needed */}
          {/* <div className="flex space-x-4 sm:hidden md:hidden lg:flex">
            <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
            <div className="bg-accent text-white p-4 rounded-lg w-[70%]">
              <MessageLight prop={0.9} />
              <MessageLight prop={0.9} />
              <MessageLight prop={0.3} />
            </div>
          </div> */}

        </div>
      </div>

      {/* Chat Footer */}
      <div className="flex items-center p-4 bg-dark-4 bg-opacity-60 rounded-b-lg backdrop-blur-md pr-20">
        <input
          type="text"
          placeholder="Message..."
          className="flex-1 p-2 bg-dark-4 text-white rounded-lg"
          disabled
        />
        <button className="ml-4 p-2 bg-accent text-white rounded-full" disabled>
          Send
        </button>
      </div>
    </div>
  );
};

const MessageLight: React.FC<MessageLightProps> = ({ prop }) => {
  return (
    <div className="bg-light-6 rounded-lg h-6 m-1" style={{ width: `${prop * 100}%` }}></div>
  );
};

const MessageDark: React.FC<MessageLightProps> = ({ prop }) => {
  return (
    <div className="bg-dark-5 rounded-lg h-6 m-1" style={{ width: `${prop * 100}%` }}></div>
  );
};


export const HandleChat = () => {
  const [isConnecting, setIsConnecting] = React.useState(false);
  const [response, setResponse] = React.useState("");

  const handleConnectChat = async() =>{
    setResponse("Connecting...");
    setIsConnecting(true);

    try {
      const result:connectWithDocRes = await connectWithDoc();

      if (!result.success || result.name === undefined) {
        setResponse("No physicians are available right now. We have received your appointment and will contact you soon.");
        setIsConnecting(false);
      } 
    }
    catch (e:any){
      setResponse("Please try again later");
      setIsConnecting(false);
    }
    return;
  }


  return(
    <div className="flex flex-col h-full w-full items-center justify-center">
      <div className='flex flex-col h-[40%] text-center text-body-semibold justify-end pb-20'>
        Reach out to our physicians for help with prescriptions, 
        <br/>medication, or health and nutrition questions
      </div>
      
      <div className='flex flex-col h-[50%] w-[80%] items-center'>
        { !isConnecting ? <button className="button-custom w-64 border border-white" onClick={handleConnectChat}>Connect Now</button>
        : 
        <div className='flex flex-col justify-center items-center text-white'>
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
        <div className="text-center text-body-medium w-full">
          <br/>
          <br/>

          {response}
        </div>
      </div>
    </div>
  )
}
