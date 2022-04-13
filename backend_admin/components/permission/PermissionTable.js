import Table from 'rc-table';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { permissionsAllWithGroupWise } from '../../redux/data_fetch/permissionDataFetch';
import Modal from './Modal';


const PermissionTable = () => {
  const dispatch = useDispatch();
  const permissionData = useSelector((state)=>state.store.permissions.items);
  const [modal, setModal] = useState(false);
  const [tableSingleColumnData, setTableSingleColumnData] = useState('');
  const [modalMode, setModalMode] = useState('');
  

 


  //Table Role assign Click Function 
  const xxHandler = (data)=>{
    setModal(true)
    setTableSingleColumnData(data)
    setModalMode('PermissionAssign')
  }
  
  //Table Edit Click Function
  const editHandler = (data)=>{
    setModal(true)
    setTableSingleColumnData(data)
    setModalMode('editPermission')
  }
  
  //Table Delete Click Function
  const deleteHandler = (data)=>{
    setModal(true)
    setTableSingleColumnData(data)
    setModalMode('deletePermission')
  }

  useEffect(()=>{
    dispatch(permissionsAllWithGroupWise())
  },[]);

    const columns = [
        {
          title: 'No',
          dataIndex: 'name',
          key: 'name',
          width: 100,
          className:"text-white bg-gray-800 p-2 border-r-2 border-b-2",
          rowClassName:"bg-black-ripon",
          render:(text,record,index)=>`${index+1}`
        },
        {
          title: 'Permission Name',
          dataIndex: 'details',
          key: 'details',
          width: 400,
          className:"text-white bg-gray-600 p-2 border-r-2 border-b-2",
          render: (data) =>{
            return   <div>{data.map((permission, index)=> <><span key={index}>{permission.name}</span> <br/></>)}</div>
           }
        },
        {
          title: 'Group Name',
          dataIndex: '_id',
          key: '_id',
          width: 400,
          className:"text-white bg-gray-800 p-2 border-r-2 border-b-2",
          render: (data) =>{
            return   <div>{data.groupName}</div>
           }
        },
        {
          title: 'Operations',
          dataIndex: '',
          key: 'operations',
          className:"text-white bg-gray-600 p-2 border-b-2",
          render: (data) => <>
                        <a href="#" onClick={()=>xxHandler(data)}>Role Assign</a> | 
                        <a href="#" onClick={()=>editHandler(data)}>Edit</a> | 
                        <a href="#" onClick={()=>deleteHandler(data)}>Delete</a>
                        </>,
          
        },
      ];
      
         

    return (
        <>
        <Table columns={columns} data={permissionData} rowKey="id"  className='bg-purple-700 p-4 w-full text-center rc-table-custom font-semibold '/>
        <Modal 
          modal={modal} 
          setModal={setModal} 
          inputStatus={modalMode}
          dataInfo={tableSingleColumnData}
        />
        </>
        
    );
};

export default PermissionTable;