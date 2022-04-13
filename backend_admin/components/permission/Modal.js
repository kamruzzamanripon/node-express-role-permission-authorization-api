/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";
import { useDispatch, useSelector } from "react-redux";
import { createPermission, deletePermission, editPermission, permissionsAllWithGroupWise } from "../../redux/data_fetch/permissionDataFetch";

const Modal = ({modal, setModal, inputStatus, dataInfo}) => {
  
  const permissionData = useSelector((state)=>state.store.permissions.items);   
  const { register, handleSubmit, formState: { errors, isDirty,dirtyFields }, reset, watch, setValue } = useForm();
  const [editPermisionName, setEditPermisionName] = useState();
  const [rundefaultUseEffect, setRundefaultUseEffect] = useState(false);
  const dispatch = useDispatch();

  const fields = watch();
  
  const formHandle = (data, e)=>{
    e.preventDefault();
    if(inputStatus === 'createPermission'){
      //if choose new group than replace orGroupName data in groupName
      if(data.groupName === '' && data.orGroupName){
        data.groupName = data.orGroupName;
        data.orGroupName = '';
      }
      //console.log(data)
      dispatch(createPermission(data))
    }
    setModal(false)
    setRundefaultUseEffect(true)
  }

  const deleteHandle = (permissionId)=>{
    //console.log("deleteData", permissionId)
    dispatch(deletePermission(permissionId))
    setModal(false)
    reset()
    setRundefaultUseEffect(true)
  }


  const updateHandle = (permissionId, editPermisionName)=>{
    const data={
      id:permissionId,
      name:editPermisionName
    }
    dispatch(editPermission(data))
    setModal(false)
    reset()
    setRundefaultUseEffect(true)
  }
  

  useEffect(()=>{
    dispatch(permissionsAllWithGroupWise())
    setRundefaultUseEffect(false)
  },[rundefaultUseEffect])
  

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
                  {inputStatus === 'deletePermission' ? <p>Delete Permission</p> : ''}
                  {inputStatus === 'editPermission' ?   <p>Edit Permission</p> : ''}
                  
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



              {/* Permission Input For Delete */}
              {inputStatus === 'deletePermission' ? 
              
              <div className=" space-y-2">
                
                  <>
                  <label className="font-semibold pr-2">Group Name</label>
                  <input 
                    className="border-2 border-purple-600/50 w-[75%] " 
                    type="text" {...register(`groupName`, {required: "required"})} 
                    
                    defaultValue={dataInfo._id.groupName}
                  /> <br />

                    {dataInfo?.details.map((permission, index)=>(
                      <div className="flex justify-between items-center space-x-4">
                        <label className="font-semibold pr-2 w-52">Permission Name</label>
                        
                        <p className="text-left">{permission.name}</p>
                        <br />
                        <button className="bg-gray-700 text-white p-1 text-sm w-40" onClick={()=>deleteHandle(permission._id)} >Delete</button> 
                      </div>
                    ))}
                    
                  </> 
              </div>
             
                  : ''
              }



            {/* Permission Input For Edit/UPdate */}
              {inputStatus === 'editPermission' ? 
              
              <div className=" space-y-2">
                
                  <>
                  <label className="font-semibold pr-2">Group Name</label>
                  <input 
                    className="border-2 border-purple-600/50 w-[75%] " 
                    type="text" name="groupName" 
                    defaultValue={dataInfo._id.groupName}
                    //onChange={(e)=>editPermisionGroupName(e.target.value)} 
                    disabled
                  /> <br />

                    {dataInfo?.details.map((permission, index)=>(
                      <div className="flex justify-between items-center space-x-4">
                        <label className="font-semibold pr-2 w-52">Permission Name</label>
                        
                        <input 
                          className="border-2 border-purple-600/50 w-[75%] " 
                          type="text" name="name" 
                          defaultValue={permission.name} 
                          onChange={(e)=>setEditPermisionName(e.target.value)} 
                          // {...register(`${permission._id}`)}
                        />
                        
                       
                        <br />
                        <button className="bg-gray-700 text-white p-1 text-sm w-40" onClick={()=>updateHandle(permission._id, editPermisionName)} >Update</button> 
                      </div>
                    ))}
                    
                  </> 
              </div>
             
                  : ''
              }
          
             
              {inputStatus === 'createPermission' ? 
                <>
                  <div className="flex justify-between">
                      <label className="font-semibold pr-2">Exists Group</label>
                      <select className="border-2 border-purple-600/50 w-[75%] " type="text" {...register("groupName")}>
                          <option value="">Choose any Category</option>
                          {permissionData?.map((groupName, index)=>(
                            <option value={groupName._id.groupName}>{groupName._id.groupName}</option>
                          ))}
                      </select>
                  </div>

                      
                  <p className="text-2xl font-bold text-center">OR</p>      

                  {/* Permission Input Group Name */}

                  <div className="flex justify-between">
                    
                      <>
                        <label className="font-semibold pr-2">New Group Name</label>
                        <input className="border-2 border-purple-600/50 w-[75%] " type="text" {...register("orGroupName")} disabled={fields.groupName ? true : false} />
                      </> 
                  </div>
                </>
                  : ''
                }

              
              
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
