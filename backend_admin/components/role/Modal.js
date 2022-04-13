/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";
import { useDispatch, useSelector } from "react-redux";
import { permissionsAllWithGroupWise } from "../../redux/data_fetch/permissionDataFetch";
import { createNewRole, deleteRole, editRole, roleAllWithPermissions, roleAssignPermission } from "../../redux/data_fetch/roleDataFecth";

const Modal = ({modal, setModal,  inputStatus, dataInfo}) => {
  const permissionInfo = useSelector(state=>state.store.permissions.items);
  const [permissionsSelectAll, setPermissionsSelectAll] = useState(false)
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors, isDirty,dirtyFields }, reset, watch, setValue } = useForm();
  const defaultSelectedPermissionArray = dataInfo?.permissionArray;
  const [rundefaultUseEffect, setRundefaultUseEffect] = useState(false);
    
  //console.log("permission", dataInfo)
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

    if(inputStatus === 'createRole'){
      dispatch(createNewRole(data))
      reset()
    }else if(inputStatus === 'deleteRole'){
      dispatch(deleteRole(data))
      reset()
    }else if(inputStatus === 'editRole'){
      dispatch(editRole(data))
      reset()
    }else if(inputStatus === 'roleAssign'){
      dispatch(roleAssignPermission(data))
      reset()
    }
    
    setModal(false)
    setRundefaultUseEffect(true)
    
  }

 
  //default dispatch permission list for input form
  useEffect(()=>{
    dispatch(permissionsAllWithGroupWise())
  },[]);
  

  // default Table role list run
  useEffect(()=>{
    dispatch(roleAllWithPermissions())
    setRundefaultUseEffect(false)
  },[rundefaultUseEffect])

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

            {/* Item Id insert for Edit and Delete */}
            {inputStatus === 'deleteRole' || inputStatus === 'editRole' || inputStatus === 'roleAssign' ?
                      (<input 
                      className="border-2 border-purple-600/50 w-[75%] "
                      defaultValue={dataInfo?.roleInfo.roleId}
                      type="hidden" 
                      {...register("roleId")}
                    />) : ''
            }
              
              <div className={`${inputStatus === 'deleteRole' ?'bg-red-600' : 'bg-purple-600'}  p-2 font-bold text-lg text-center text-white -mt-4 -mx-4 mb-5 pb-4`}>
                   {inputStatus === 'deleteRole' ? <p>Delete Role</p> : ''} 
                   {inputStatus === 'createRole' ? <p>Create Role</p> : ''}
                   {inputStatus === 'editRole' ?   <p>Edit Role</p> : ''}
                   {inputStatus === 'roleAssign' ? <p>Role Assign</p> : ''}
              </div>


              <div className="flex justify-between">
                  {inputStatus === 'createRole' ? 
                    <>
                      <label className="font-semibold pr-2">Name</label>
                        <input 
                          className="border-2 border-purple-600/50 w-[75%] " type="text" 
                          {...register("name", {
                            required: "required",
                          })} 
                        />
                        <br />
                        {errors.name && <p className="text-red-700 text-right font-semibold">This  Field is Required</p>}
                    </> 
                    : ''} 

                    {inputStatus === 'editRole' ? 
                      <>
                      <label className="font-semibold pr-2">Name</label>
                        <input 
                          className="border-2 border-purple-600/50 w-[75%] " type="text" 
                          defaultValue={dataInfo.roleInfo.roleName}
                          {...register("name", {
                            required: "required",
                          })} 
                        />
                        <br />
                        {errors.name && <p className="text-red-700 text-right font-semibold">This  Field is Required</p>}
                    </> 
                    : ''}

                    {inputStatus === 'roleAssign' || inputStatus === 'deleteRole' ? <p className=" text-center text-2xl text-red-500">{dataInfo.roleInfo.roleName}</p> : ''}
              </div>
              
                  

              {/* All permission List show*/}
              {inputStatus === 'roleAssign' || inputStatus === 'deleteRole' || inputStatus === 'createRole' ?            
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
                          {permission.details.map((permissionName, indexName)=>{
                            const defaultValue = defaultSelectedPermissionArray && defaultSelectedPermissionArray.length > 0 ? 
                                                defaultSelectedPermissionArray.filter((defaultItem)=> defaultItem.permisiionId === permissionName._id ) : false;
                            const defaultId = defaultValue[0]?.permisiionId
                            //console.log(defaultValue)
                             return <label className="flex items-center ml-2" key={indexName}>
                                <input 
                                  type="checkbox" 
                                  className="border-gray-300 rounded h-5 w-5 mr-1" 
                                  value={permissionName._id}
                                  defaultChecked={defaultId === permissionName._id ? true : false }
                                   //checked={fields.selectAll }
                                   {...register("permissions[]")}
                                />
                                <span className="cursor-pointer">{permissionName.name}</span>     
                              </label>
                          })}
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
              : ''} 
               {/* End All permission List show*/}



                                   
              <div className="flex justify-between">
                  {inputStatus === 'deleteRole' ? <button className="bg-red-700 text-white p-3 w-full mt-5 text-lg">Delete Role</button> : ''} 
                  {inputStatus === 'createRole' ? <button className="bg-gray-700 text-white p-3 w-full mt-5 text-lg">Create New Role</button> : ''}
                  {inputStatus === 'editRole' ? <button className="bg-gray-700 text-white p-3 w-full mt-5 text-lg">Edit Role</button> : ''}
                  {inputStatus === 'roleAssign' ? <button className="bg-gray-700 text-white p-3 w-full mt-5 text-lg">Role Assign</button> : ''}
                  
              </div>
          </div>
        </form>
      </PureModal>
      
    </>
  );
};

export default Modal;
