import { combineReducers } from "@reduxjs/toolkit";
import permissionReducer from './permissionSlice';
import roleReducer from './roleSlice';


const reducers = combineReducers({
    role:roleReducer,
    permissions:permissionReducer,
   
  })

export default reducers