import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

//all permission list with group wise
export const userLogin =  createAsyncThunk(
    'userInfo/userLogin',
      async (data)=>{
        
            try{
                const res = await axios.post(`${process.env.apiBaseUrl}/user-login`, data);
                console.log("api Hello", res.data)
                const token = res.data.data.jwt_token
                const user_info = res.data.data.userAllInfo
                Cookies.set("jwt_backend",  token)
                Cookies.set("user_info",  JSON.stringify(user_info))
                axios.defaults.headers.common["Authorization"] = `${token}`
                //console.log("permissionAllWithPagination server", res.data.Permission_info)
                return res.data.data
            }catch(error){
                console.log("server Error", error.response)
                return  error.response.data
            }
        }
)


//New User Create
export const userCreate =  createAsyncThunk(
    'userInfo/userCreate',
      async (data)=>{
        
            try{
                const res = await axios.post(`${process.env.apiBaseUrl}/create-user`, data);
                //console.log("api Hello", res.data)
               
                return res.data.data
            }catch(error){
                console.log("server Error", error.response)
                return  error.response.data
            }
        }
)


//User All List
export const userAllList =  createAsyncThunk(
    'userInfo/userAllList',
      async ()=>{
        
            try{
                const res = await axios.get(`${process.env.apiBaseUrl}/user-all-list`);
                console.log("api Hello", res.data)
               
                return res.data.data
            }catch(error){
                console.log("server Error", error.response)
                return  error.response.data
            }
        }
)