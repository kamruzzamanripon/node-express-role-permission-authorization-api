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


//Role Create with permission Assign
export const newRole =  createAsyncThunk(
    'role/newRole',
      async (data)=>{
        
            try{
                const res = await axios.post(`${process.env.apiBaseUrl}/create-role`);
                //console.log("api Hello", res)
                //console.log("permissionAllWithPagination server", res.data.Permission_info)
                return res.data.data
            }catch(e){
                console.log("server Error", e)
            }
        }
)