/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import { useForm } from 'react-hook-form';
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";
import { useDispatch, useSelector } from "react-redux";
import { roleList } from "../../redux/data_fetch/roleDataFecth";
import { userCreate, userRoleAssign } from "../../redux/data_fetch/userInfoDataFetch";


const Modal = ({modal, setModal, inputStatus, dataInfo}) => {

  const { register, handleSubmit, formState: { errors, isDirty,dirtyFields }, reset, watch, setValue } = useForm();
  const roleListInfo = useSelector((state)=>state?.store?.role?.items);
  const dispatch = useDispatch();
  
    
  //console.log('user compnent')


  const formHandle = (data, e)=>{
    e.preventDefault();

    if(inputStatus === 'createUser'){
      dispatch(userCreate(data))
      //console.log(data)
      reset()
    }
    else if(inputStatus === 'roleAssignUser'){
      dispatch(userRoleAssign(data))
      //console.log(data)
      reset()
    }
    
    setModal(false)
    //setRundefaultUseEffect(true)
    
  }

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



              {inputStatus === 'roleAssignUser' ?
                <div className="space-y-3">
                    <input 
                      className="border-2 border-purple-600/50 w-[75%] "
                      defaultValue={dataInfo?._id}
                      type="hidden" 
                      {...register("userId")}
                    />

                    <div className="flex justify-between">
                        <label className="font-semibold pr-2">User Name</label>
                        <p>{dataInfo?.name}</p>
                    </div>

                    <div className="flex justify-between">
                      <label className="font-semibold pr-2">Role List</label>
                      <select className="border-2 border-purple-600/50 w-[75%] " type="text" {...register("roleId", {required: "required"})} >
                          <option value="">Choose any Role</option>
                          {roleListInfo && roleListInfo.length > 0 && roleListInfo.map((role, index)=><option value={role._id} key={index}>{role.name}</option>)}
                      </select>
                    </div>
                    {errors.roleId && <p className="text-red-700 text-right font-semibold">This  Field is Required</p>}

                    <div className="flex justify-between">
                        <button className="bg-gray-700 text-white p-3 w-full mt-5 text-lg">Submit</button>
                    </div>
                 </div> 
              : ''} 


              {inputStatus === 'deleteUser' ?
                <div className="space-y-3">
                    <input 
                      className="border-2 border-purple-600/50 w-[75%] "
                      defaultValue={dataInfo?.roleInfo.roleId}
                      type="hidden" 
                      {...register("roleId")}
                    />

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
