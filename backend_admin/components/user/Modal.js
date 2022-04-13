/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import { useForm } from 'react-hook-form';
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";
import { useDispatch } from "react-redux";
import { userCreate } from "../../redux/data_fetch/userInfoDataFetch";

const Modal = ({modal, setModal, inputStatus, dataInfo}) => {

  const { register, handleSubmit, formState: { errors, isDirty,dirtyFields }, reset, watch, setValue } = useForm();
  const dispatch = useDispatch();
    
  console.log('user compnent', inputStatus)


  const formHandle = (data, e)=>{
    e.preventDefault();

    if(inputStatus === 'createUser'){
      dispatch(userCreate(data))
      //console.log(data)
      reset()
    }
    
    setModal(false)
    //setRundefaultUseEffect(true)
    
  }
   
  //if modal de-select then reset all data
  useEffect(()=>{
     if(!modal)reset()
},[modal])
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
        <div className="flex-row space-y-3 relative">
            <div className="bg-purple-600 p-2 font-bold text-lg text-center text-white -mt-4 -mx-4 mb-5 pb-4">
                {inputStatus === 'createUser' ?<p>Create New User</p> : ''} 
            </div>
            
            <form action="" onSubmit={handleSubmit(formHandle)}>
              
              {inputStatus === 'createUser' ?
                <div className="space-y-3">
                    <div className="flex justify-between">
                        <label className="font-semibold pr-2">Name</label>
                        <input className="border-2 border-purple-600/50 w-[75%] " type="text" {...register("name", {required: "required"})} />
                    </div>
                    {errors.name && <p className="text-red-700 text-right font-semibold">This  Field is Required</p>}

                    <div className="flex justify-between">
                        <label className="font-semibold pr-2">email</label>
                        <input className="border-2 border-purple-600/50 w-[75%] " type="email" {...register("email", {required: "required"})}/>
                    </div>
                    {errors.email && <p className="text-red-700 text-right font-semibold">This  Field is Required</p>}

                    <div className="flex justify-between">
                        <label className="font-semibold pr-2">Password</label>
                        <input className="border-2 border-purple-600/50 w-[75%] " type="text" {...register("password", {required: "required"})} />
                    </div>
                    {errors.password && <p className="text-red-700 text-right font-semibold">This  Field is Required</p>}
                    
                    <div className="flex justify-between">
                        <label className="font-semibold pr-2">Phone</label>
                        <input className="border-2 border-purple-600/50 w-[75%] " type="number"  {...register("phone")}/>
                    </div>
                              
                    
                    <div className="flex justify-between">
                        <button className="bg-gray-700 text-white p-3 w-full mt-5 text-lg">Submit</button>
                    </div>
                </div> 
              : ''} 

            </form>
            
            
        </div>
      </PureModal>
      
    </>
  );
};

export default Modal;
