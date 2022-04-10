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
            }catch(e){
                console.log("server Error", e)
            }
        }
)