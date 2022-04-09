import { createSlice } from "@reduxjs/toolkit";
import { roleAllWithPermissions } from "../data_fetch/roleDataFecth";



const initialState = {
    loading:false,
    items: [],
    item:{}
}

const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    resetRoleSliceItem: (state, {payload}) =>{
      state.loading = false
      state.item = {}
    }
  },
  extraReducers:{
       //Role List with related all permisssion
      [roleAllWithPermissions.pending]: (state) => {
        state.loading = true
      },
      [roleAllWithPermissions.fulfilled]: (state, { payload }) => {
          state.loading = false
          state.items = payload
      },
      [roleAllWithPermissions.rejected]: (state) => {
          state.loading = false
      },   

  }
});


export const {resetRoleSliceItem } = roleSlice.actions;

export default roleSlice.reducer;