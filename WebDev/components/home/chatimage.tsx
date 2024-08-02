interface MessageLightProps {
  prop: number;
}

const ChatImage = () => {
    return (
        <div className="border border-white relative flex flex-col bg-dark-3 text-light-1 
w-full -mt-10 overflow-hidden
">
      {/* Chat Content */}
      <div className="relative flex flex-col z-20 p-4">
        
      
        {/* Chat Header */}
        <div className="flex items-center p-4 bg-dark-4 bg-opacity-60 rounded-t-lg backdrop-blur-md mb-4">
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
        <div className="flex space-x-4 justify-end">
          <div className="bg-gray-600 text-white p-4 rounded-lg w-[70%]">
            < MessageDark prop={0.9}/>
            < MessageDark prop={0.7}/>
          </div>
        </div>

        <div className="flex-1 p-4 space-y-4 overflow-y-hidden bg-dark-1 bg-opacity-60 backdrop-blur-md">
          <div className="flex space-x-4">
            <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
            <div className="bg-primary-500 text-white p-4 rounded-lg w-3/5">
              < MessageLight prop={0.9}/>
            </div>
          </div>
          <div className="flex space-x-4 justify-end">
            <div className="flex flex-col items-end bg-gray-600 text-white p-4 rounded-lg w-3/5">
              <MessageDark prop={0.9}/>
              < MessageDark prop={0.3}/>
            </div>
            <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
          </div>
          {/* Add more messages as needed */}
        </div>

        <div className="flex-1 p-4 space-y-4 overflow-y-hidden bg-dark-1 bg-opacity-60 backdrop-blur-md">
          <div className="flex space-x-4">
            <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
            <div className="bg-primary-500 text-white p-4 rounded-lg w-[50%] ">
              < MessageLight prop={0.9}/>
              < MessageLight prop={0.3}/>
            </div>
          </div>
          <div className="flex space-x-4 justify-end">
            <div className="bg-gray-600 text-white p-4 rounded-lg w-[70%]">
              < MessageDark prop={0.9}/>
              < MessageDark prop={0.7}/>
            </div>
            <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
          </div>
          {/* Add more messages as needed */}
        </div>

        {/* Chat Footer */}
        <div className="flex items-center p-4 bg-dark-4 bg-opacity-60 rounded-b-lg backdrop-blur-md">
          <input
            type="text"
            placeholder="Message..."
            className="flex-1 p-2 bg-dark-4 text-white rounded-lg"
            disabled
          />
          <button className="ml-4 p-2 bg-primary-500 text-white rounded-full" disabled>
            Send
          </button>
        </div>
      </div>
    </div>
    )
}

const MessageLight: React.FC<MessageLightProps> = ({ prop }) => {  
  return (
    <div className="bg-light-6 rounded-lg h-6 m-1" style={{ width: `${prop * 100}%` }}>
      </div>
    )
}

const MessageDark: React.FC<MessageLightProps> = ({ prop }) => {
  return (
    <div className="bg-dark-5 rounded-lg h-6 m-1" style={{ width: `${prop * 100}%` }}>
    </div>
  )
}

export default ChatImage;