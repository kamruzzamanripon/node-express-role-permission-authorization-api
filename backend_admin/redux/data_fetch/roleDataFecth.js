import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//Role List with related all permisssion
export const roleAllWithPermissions =  createAsyncThunk(
    'role/roleListWithPermissions',
      async (pageNumber)=>{
        
            try{
                const res = await axios.get(`${process.env.apiBaseUrl}/role-list-with-permissions`);
                //console.log("api Hello", res)
                //console.log("permissionAllWithPagination server", res.data.Permission_info)
                return res.data.data
            }catch(e){
                console.log("server Error", e)
            }
        }
)


//Role Create and if have any permissions then assign
export const createNewRole =  createAsyncThunk(
    'role/newRole',
      async (data)=>{
          try{
                const res = await axios.post(`${process.env.apiBaseUrl}/create-role`, data);
                //console.log("api Hello", res)
                //console.log("permissionAllWithPagination server", res.data.Permission_info)
                return res.data.data
            }catch(e){
                console.log("server Error", e)
            }
        }
)



//delete Role
export const deleteRole =  createAsyncThunk(
    'role/deleteRole',
      async (data)=>{
          try{
                const roleId = data.roleId
                const res = await axios.delete(`${process.env.apiBaseUrl}/role-delete/${roleId}`);
                //console.log("api Hello", res)
                //console.log("permissionAllWithPagination server", res.data.Permission_info)
                return res.data.data
            }catch(e){
                console.log("server Error", e)
            }
        }
)


//Edit Role
export const editRole =  createAsyncThunk(
    'role/editRole',
      async (data)=>{
          try{
                const roleId = data.roleId
                const res = await axios.post(`${process.env.apiBaseUrl}/edit-role/${roleId}`, data);
                //console.log("api Hello", res)
                //console.log("permissionAllWithPagination server", res.data.Permission_info)
                return res.data.data
            }catch(e){
                console.log("server Error", e)
            }
        }
)

//Role Assing into permissions
export const roleAssignPermission =  createAsyncThunk(
    'role/roleAssignPermission',
      async (data)=>{
          try{
                const roleId = data.roleId
                const res = await axios.post(`${process.env.apiBaseUrl}/role-assign-permissin`, data);
                //console.log("api Hello", res)
                //console.log("permissionAllWithPagination server", res.data.Permission_info)
                return res.data.data
            }catch(e){
                console.log("server Error", e)
            }
        }
)