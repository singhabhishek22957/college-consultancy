import React from "react";

const MessagePopUp = ({ isOpen, message, onClose, badError }) => {
  if (!isOpen) return null;

  return (
   
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-15 backdrop-blur-md z-50">
      <div className={`p-6 flex  flex-col rounded-xl shadow-lg w-1/3 h-1/3 text-center  ${badError ? "border-4 border-red-800 bg-red-100 " : " bg-white  border-4 border-blue-500"}`}>
        <div id="top" className=" h-4/5">
          {/* Message Text */}
          <p className="text-gray-700 text-2xl font-medium " dangerouslySetInnerHTML={{ __html: message }} />
        </div>
        <div id="bottom" className=" flex justify-around  " >
          <div>
            {/* OK Button */}
            <button
              className="mt-4 w-32 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              onClick={onClose}
            >
              OK
            </button>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default MessagePopUp;
