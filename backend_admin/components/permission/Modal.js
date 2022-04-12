/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import { useForm } from 'react-hook-form';
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";
import { useSelector } from "react-redux";

const Modal = ({modal, setModal, inputStatus, dataInfo}) => {
  
  const permissionData = useSelector((state)=>state.store.permissions.items);   
  const { register, handleSubmit, formState: { errors, isDirty,dirtyFields }, reset, watch, setValue } = useForm();

  const fields = watch();
  console.log("select all", fields.groupName)

  const formHandle = (data, e)=>{
    e.preventDefault();

    if(inputStatus === 'createPermission'){
      if(fields.groupName) data.orGroupName = ''
      console.log(data)
      //reset()
    }
    
    setModal(false)
   
    
  }



   //if modal de-select then reset all data
   useEffect(()=>{
    if(!modal)reset()
  },[modal])

   
  //console.log('modal modal', permissionData)
  return (
    <>
      <PureModal
        //header={<div className="bg-purple-600 p-2 font-bold text-lg text-center text-white">Category</div>}
        isOpen={modal}
        width="800px"
        onClose={() => {
          setModal(false);
          return true;
        }}
  
      >
        <form action="" onSubmit={handleSubmit(formHandle)}>
          <div className="flex-row space-y-3 relative">
              
              <div className="bg-purple-600 p-2 font-bold text-lg text-center text-white -mt-4 -mx-4 mb-5 pb-4">
                  {inputStatus === 'createPermission' ? <p>Create Permission</p> : ''}
                  
              </div>

              {/* Permission Input Name */}
              <div className="flex justify-between">
                {inputStatus === 'createPermission' ? 
                  <>
                    <label className="font-semibold pr-2">Permission Name</label>
                    <input className="border-2 border-purple-600/50 w-[75%] " type="text" {...register("name", {required: "required"})} />
                  </> 
                  : ''
                }
              </div>

              
              <div className="flex justify-between">
                  <label className="font-semibold pr-2">Exists Group</label>
                  <select className="border-2 border-purple-600/50 w-[75%] " type="text" {...register("groupName")}>
                      <option value="">Choose any Category</option>
                      {permissionData?.map((groupName, index)=>(
                        <option value={groupName._id.groupName}>{groupName._id.groupName}</option>
                      ))}
                  </select>
              </div>

                  
              {inputStatus === 'createPermission' ? <p className="text-2xl font-bold text-center">OR</p> : ''}        

              {/* Permission Input Group Name */}
              <div className="flex justify-between">
                {inputStatus === 'createPermission' ? 
                  <>
                    <label className="font-semibold pr-2">New Group Name</label>
                    <input className="border-2 border-purple-600/50 w-[75%] " type="text" {...register("orGroupName")} disabled={fields.groupName ? true : false}  />
                  </> 
                  : ''
                }
              </div>

              
              
              <div className="flex justify-between">
                  {inputStatus === 'createPermission' ? <button className="bg-gray-700 text-white p-3 w-full mt-5 text-lg">Create New Permission</button> : ''}
              </div>
          </div>
        </form>
      </PureModal>
      
    </>
  );
};

export default Modal;
