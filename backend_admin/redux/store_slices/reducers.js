import { combineReducers } from "@reduxjs/toolkit";
import permissionReducer from './permissionSlice';
import roleReducer from './roleSlice';
import userInfoReducer from './userInfoSlice';


const reducers = combineReducers({
    role:roleReducer,
    permissions:permissionReducer,
    userInfo:userInfoReducer,
   
  })

export default reducers