import { createSlice } from "@reduxjs/toolkit";
import { userAllList, userCreate, userLogin } from "../data_fetch/userInfoDataFetch";




const initialState = {
    loading:false,
    items: [],
    item:{}
}

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    resetUserInfoSliceItem: (state, {payload}) =>{
      state.loading = false
      state.item = {}
    }
  },
  extraReducers:{
       //User Login
      [userLogin.pending]: (state) => {
        state.loading = true
      },
      [userLogin.fulfilled]: (state, { payload }) => {
          state.loading = false
          state.item = payload
      },
      [userLogin.rejected]: (state) => {
          state.loading = false
      }, 

       //User Create
      [userCreate.pending]: (state) => {
        state.loading = true
      },
      [userCreate.fulfilled]: (state, { payload }) => {
          state.loading = false
          state.item = payload
      },
      [userCreate.rejected]: (state) => {
          state.loading = false
      },    
      
      
      //User All List
      [userAllList.pending]: (state) => {
        state.loading = true
      },
      [userAllList.fulfilled]: (state, { payload }) => {
          state.loading = false
          state.items = payload
      },
      [userAllList.rejected]: (state) => {
          state.loading = false
      },    
      
      
      
  }
});


export const {resetUserInfoSliceItem } = userInfoSlice.actions;

export default userInfoSlice.reducer;