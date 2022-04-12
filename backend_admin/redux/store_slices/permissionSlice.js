import { createSlice } from "@reduxjs/toolkit";
import { createPermission, deletePermission, editPermission, permissionsAllWithGroupWise } from "../data_fetch/permissionDataFetch";




const initialState = {
    loading:false,
    items: [],
    item:{}
}

const permissionSlice = createSlice({
  name: "permission",
  initialState,
  reducers: {
    resetPermissionSliceItem: (state, {payload}) =>{
      state.loading = false
      state.item = {}
    }
  },
  extraReducers:{
       //all permission list with group wise
      [permissionsAllWithGroupWise.pending]: (state) => {
        state.loading = true
      },
      [permissionsAllWithGroupWise.fulfilled]: (state, { payload }) => {
          state.loading = false
          state.items = payload
      },
      [permissionsAllWithGroupWise.rejected]: (state) => {
          state.loading = false
      },    
      
      
      
      //Create Permissison
      [createPermission.pending]: (state) => {
        state.loading = true
      },
      [createPermission.fulfilled]: (state, { payload }) => {
          state.loading = false
          state.item = payload
      },
      [createPermission.rejected]: (state) => {
          state.loading = false
      },    
      
      
      //Delete Permissison
      [deletePermission.pending]: (state) => {
        state.loading = true
      },
      [deletePermission.fulfilled]: (state, { payload }) => {
          state.loading = false
          state.item = payload
      },
      [deletePermission.rejected]: (state) => {
          state.loading = false
      },   


      //Edit Permission 
      [editPermission.pending]: (state) => {
        state.loading = true
      },
      [editPermission.fulfilled]: (state, { payload }) => {
          state.loading = false
          state.item = payload
      },
      [editPermission.rejected]: (state) => {
          state.loading = false
      },   

  }
});


export const {resetPermissionSliceItem } = permissionSlice.actions;

export default permissionSlice.reducer;