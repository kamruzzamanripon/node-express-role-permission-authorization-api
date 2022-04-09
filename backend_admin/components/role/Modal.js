/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";

const Modal = ({modal, setModal}) => {
  const [roleInformation, setRoleInformation] = useState();
    
  
  const formHandle = (e)=>{
    e.preventDefault();
    console.log("role input info", roleInformation)
    setModal(false)
    
  }
  
  return (
    <>
      <PureModal
        isOpen={modal}
        width="800px"
        onClose={() => {
          setModal(false);
          return true;
        }}
  
      >
        <form action="" onSubmit={formHandle}>
          <div className="flex-row space-y-3 relative">
              <div className="bg-purple-600 p-2 font-bold text-lg text-center text-white -mt-4 -mx-4 mb-5 pb-4">
                  <p>Role</p>
              </div>
              <div className="flex justify-between">
                  <label className="font-semibold pr-2">Name</label>
                  <input className="border-2 border-purple-600/50 w-[75%] " type="text" onChange={(e)=>setRoleInformation({roleName:e.target.value})} />
              </div>
                        
              <div className="flex justify-between">
                  <button className="bg-gray-700 text-white p-3 w-full mt-5 text-lg">Submit</button>
              </div>
          </div>
        </form>
      </PureModal>
      
    </>
  );
};

export default Modal;
