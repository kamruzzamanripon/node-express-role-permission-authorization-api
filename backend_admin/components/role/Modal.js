/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";
import { useDispatch, useSelector } from "react-redux";
import { permissionsAllWithGroupWise } from "../../redux/data_fetch/permissionDataFetch";
import { createNewRole } from "../../redux/data_fetch/roleDataFecth";

const Modal = ({modal, setModal}) => {
  const permissionInfo = useSelector(state=>state.store.permissions.items);
  const [permissionsSelectAll, setPermissionsSelectAll] = useState(false)
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors, isDirty,dirtyFields }, reset, watch, setValue } = useForm();
    
  //console.log("permission", isCheckAll)
  //for all checkbox default value
  //const selectAll = watch('selectAll')
  //console.log("select all", selectAll)

  const groupSelectAll = ()=>{
    
  }

  const fields = watch();
  //console.log("select all", fields)
  
  const selectPermissionAll = (e)=>{
    setPermissionsSelectAll(!permissionsSelectAll)
   
  }

  const formHandle = (data, e)=>{
    e.preventDefault();
    dispatch(createNewRole(data))
    //console.log("role input info", data)
    setModal(false)
  }

 
  useEffect(()=>{
    dispatch(permissionsAllWithGroupWise())
  },[]);

  //if modal de-select then reset all data
  useEffect(()=>{
    if(!modal)reset()
},[modal])
  
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
        <form action="" onSubmit={handleSubmit(formHandle)}>
          <div className="flex-row space-y-3 relative">
              <div className="bg-purple-600 p-2 font-bold text-lg text-center text-white -mt-4 -mx-4 mb-5 pb-4">
                  <p>Role</p>
              </div>
              <div className="flex justify-between">
                  <label className="font-semibold pr-2">Name</label>
                  <input 
                    className="border-2 border-purple-600/50 w-[75%] " type="text" 
                    {...register("name", {
                      required: "required",
                    })} 
                  />
                  <br />
              </div>
              {errors.name && <p className="text-red-700 text-right font-semibold">This  Field is Required</p>}

              <div className="text-center">
               <h1 className="border-2 mb-2">Permission List </h1>
             
                {permissionInfo && permissionInfo.map((permission, index)=>(
                    <div className="flex items-center border-b-2 pb-3" key={index}>
                    <div className="w-1/3  p-3 bg-slate-600 text-white text-center">
                        <p>{permission._id.groupName}e</p>
                        <label className="cursor-pointer">
                          <input 
                            type='checkbox' 
                            className="bg-yellow-400 text-black p-1 px-3 mt-3 mr-2 cursor-pointer"
                            onClick={groupSelectAll}
                          />
                          Select All
                        </label>
                    </div>
                   
                    <div className="flex space-x-4 space-y-3 flex-wrap items-center justify-end">
                          {permission.details.map((permissionName, indexName)=>(
                              <label className="flex items-center ml-2" key={indexName}>
                                <input 
                                  type="checkbox" 
                                  className="border-gray-300 rounded h-5 w-5 mr-1" 
                                  value={permissionName._id}
                                   //checked={fields.selectAll }
                                   {...register("permissions[]")}
                                />
                                <span className="cursor-pointer">{permissionName.name}</span>     
                              </label>
                          ))}
                    </div>
                  </div>
                ))}
                              
                <label className="cursor-pointer">
                  <input 
                    className="mt-5 mr-3 inline-block bg-yellow-600 py-1 px-4 cursor-pointer" 
                    type='checkbox' 
                    {...register("selectAll")}
                   // onChange={(e)=>selectPermissionAll(e)}
                  />Selet All Permissions       
                </label>
                
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
