import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//Role List with related all permisssion
export const roleAllWithPermissions =  createAsyncThunk(
    'role/roleListWithPermissions',
      async (pageNumber)=>{
        
            try{
                const res = await axios.get(`${process.env.apiBaseUrl}/role-list-with-permissions`);
                console.log("api Hello", res)
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
              const formData = new FormData();
              formData.append('name', data.name)
              //formData.append('permissionId[]', data.permissions)
              console.log("axios data", data)
              console.log("axio data", [...formData])
                
                const res = await axios.post(`${process.env.apiBaseUrl}/create-role`, data);
                //console.log("api Hello", res)
                //console.log("permissionAllWithPagination server", res.data.Permission_info)
                return res.data.data
            }catch(e){
                console.log("server Error", e)
            }
        }
)