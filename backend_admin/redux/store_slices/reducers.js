import { combineReducers } from "@reduxjs/toolkit";
import roleReducer from './roleSlice';


const reducers = combineReducers({
    role:roleReducer,
   
  })

export default reducers