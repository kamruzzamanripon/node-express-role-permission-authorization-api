import Table from 'rc-table';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userAllList } from '../../redux/data_fetch/userInfoDataFetch';
import Modal from './Modal';


const UsersTable = () => {

  const dispatch = useDispatch();
  const userData = useSelector((state)=>state?.store?.userInfo?.items);


  //Table Role assign Click Function 
  const roleAssignHandler = (data)=>{
    setModal(true)
    setTableSingleColumnData(data)
    setModalMode('roleAssign')
  }
  
  //Table Edit Click Function
  const editHandler = (data)=>{
    setModal(true)
    setTableSingleColumnData(data)
    setModalMode('editRole')
  }
  
  //Table Delete Click Function
  const deleteHandler = (data)=>{
    setModal(true)
    setTableSingleColumnData(data)
    setModalMode('deleteRole')
  }

  console.log("user Data", userData)
  //default dispatch User all information for table
  useEffect(()=>{
    dispatch(userAllList())
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
          title: 'User Name',
          dataIndex: 'name',
          key: 'name',
          width: 400,
          className:"text-white bg-gray-600 p-2 border-r-2 border-b-2"
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
          width: 400,
          className:"text-white bg-gray-800 p-2 border-r-2 border-b-2"
        },
        {
          title: 'Phone',
          dataIndex: 'phone',
          key: 'email',
          width: 400,
          className:"text-white bg-gray-800 p-2 border-r-2 border-b-2"
        },
        {
          title: 'Role',
          dataIndex: 'roleInfo',
          key: 'roleInfo',
          width: 400,
          className:"text-white bg-gray-800 p-2 border-r-2 border-b-2",
          render: (data) =>{
            return   <p href="#">{data[0].name}</p>
           }
        },
        {
          title: 'Operations',
          dataIndex: '',
          key: 'operations',
          className:"text-white bg-gray-600 p-2 border-b-2",
          render: () => <>
                         <a href="#" onClick={()=>roleAssignHandler(data)}>Role Assign</a> | 
                          <a href="#" onClick={()=>editHandler(data)}>Edit</a> | 
                          <a href="#" onClick={()=>deleteHandler(data)}>Delete</a>
                      </>,
          
        },
      ];
      
         

    return (
        <>
        <Table columns={columns} data={userData}  className='bg-purple-700 p-4 w-full text-center rc-table-custom font-semibold '/>
        <Modal 
          modal={modal} 
          setModal={setModal} 
          inputStatus={modalMode}
          dataInfo={tableSingleColumnData}
        />
        
        </>
        
    );
};

export default UsersTable;