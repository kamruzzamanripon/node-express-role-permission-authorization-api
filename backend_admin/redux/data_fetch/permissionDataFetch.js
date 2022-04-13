import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//all permission list with group wise
export const permissionsAllWithGroupWise =  createAsyncThunk(
    'permission/permissionsAllWithGroupWise',
      async ()=>{
        
            try{
                const res = await axios.get(`${process.env.apiBaseUrl}/permission-all-with-group-wise`);
                //console.log("api Hello", res)
                //console.log("permissionAllWithPagination server", res.data.Permission_info)
                return res.data.data
            }catch(error){
                console.log("server Error", error.response)
                return  error.response.data
            }
        }
)



//new Permission create
export const createPermission =  createAsyncThunk(
    'permission/createPermission',
      async (data)=>{

            try{
                //console.log("axios", data)
                const res = await axios.post(`${process.env.apiBaseUrl}/create-permission`, data);
                //console.log("api Hello", res)
                //console.log("permissionAllWithPagination server", res.data.Permission_info)
                return res.data.data
            }catch(error){
                console.log("server Error", error.response)
                return  error.response.data.message
            }
        }
)

//Delete Permission 
export const deletePermission =  createAsyncThunk(
    'permission/deletePermission',
      async (permissionId)=>{
            console.log("axior", permissionId)
            try{
                //console.log("axios", data)
                const res = await axios.delete(`${process.env.apiBaseUrl}/delete-permission/${permissionId}`);
                //console.log("api Hello", res)
                //console.log("permissionAllWithPagination server", res.data.Permission_info)
                return res.data.data
            }catch(error){
                console.log("server Error", error.response)
                return  error.response.data
            }
        }
)

//Edit Permission 
export const editPermission =  createAsyncThunk(
    'permission/editPermission',
      async ( data)=>{
            console.log("axior", data)
            try{
                //console.log("axios", data)
                const res = await axios.post(`${process.env.apiBaseUrl}/edit-permission/${data.id}`, data);
                //console.log("api Hello", res)
                //console.log("permissionAllWithPagination server", res.data.Permission_info)
                return res.data.data
            }catch(error){
                console.log("server Error", error.response)
                return  error.response.data
            }
        }
)