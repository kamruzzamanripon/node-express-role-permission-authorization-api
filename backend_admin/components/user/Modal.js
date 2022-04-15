/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";
import { useDispatch } from "react-redux";
import { roleList } from "../../redux/data_fetch/roleDataFecth";
import { userAllList, userCreate, userRoleAssign } from "../../redux/data_fetch/userInfoDataFetch";
import CreateUser from "./sort/CreateUser";
import RoleAssignUserOrDeleteUser from "./sort/RoleAssignUserOrDeleteUser";


const Modal = ({modal, setModal, inputStatus, dataInfo}) => {

  const { register, handleSubmit, formState: { errors, isDirty,dirtyFields }, reset, watch, setValue } = useForm();
 
  const [rundefaultUseEffect, setRundefaultUseEffect] = useState(false);
  const dispatch = useDispatch();
  
    
  console.log('user compnent', dataInfo)


  const formHandle = (data, e)=>{
    e.preventDefault();

    if(inputStatus === 'createUser'){
      dispatch(userCreate(data))
      //console.log(data)
    }
    else if(inputStatus === 'roleAssignUser'){
      dispatch(userRoleAssign(data))
      //console.log(data)
    }
    
    reset()
    setModal(false)
    setRundefaultUseEffect(true)
    //setRundefaultUseEffect(true)
    
  }


  // default Table User list run
  useEffect(()=>{
    dispatch(userAllList())
    setRundefaultUseEffect(false)
  },[rundefaultUseEffect])

  //default featch all role list for role assign input
  useEffect(()=>{
    dispatch(roleList())
  },[])
   
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
                {inputStatus === 'roleAssignUser' ?<p>User Role Assign</p> : ''} 
                {inputStatus === 'deleteUser' ?<p className="text-red-400">User Delete</p> : ''} 
            </div>
            
            <form action="" onSubmit={handleSubmit(formHandle)}>
              
              {inputStatus === 'createUser' ? <CreateUser register={register} errors={errors} /> : ''} 
              {inputStatus === 'roleAssignUser' || inputStatus === 'deleteUser' ? <RoleAssignUserOrDeleteUser register={register} errors={errors} dataInfo={dataInfo} inputStatus={inputStatus} /> : ''} 


            </form>
            
            
        </div>
      </PureModal>
      
    </>
  );
};

export default Modal;
