import { createSlice } from "@reduxjs/toolkit";
import { createNewRole, deleteRole, editRole, roleAllWithPermissions, roleAssignPermission, roleList } from "../data_fetch/roleDataFecth";



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
      
      
      //Role List 
      [roleList.pending]: (state) => {
        state.loading = true
      },
      [roleList.fulfilled]: (state, { payload }) => {
          state.loading = false
          state.items = payload
      },
      [roleList.rejected]: (state) => {
          state.loading = false
      },  
      
      
      //Role List with related all permisssion
      [createNewRole.pending]: (state) => {
        state.loading = true
      },
      [createNewRole.fulfilled]: (state, { payload }) => {
          state.loading = false
          state.item = payload
      },
      [createNewRole.rejected]: (state) => {
          state.loading = false
      },  
      
      
      //Delete Role
      [deleteRole.pending]: (state) => {
        state.loading = true
      },
      [deleteRole.fulfilled]: (state, { payload }) => {
          state.loading = false
          state.item = payload
      },
      [deleteRole.rejected]: (state) => {
          state.loading = false
      },  
      
      //Edit Role
      [editRole.pending]: (state) => {
        state.loading = true
      },
      [editRole.fulfilled]: (state, { payload }) => {
          state.loading = false
          state.item = payload
      },
      [editRole.rejected]: (state) => {
          state.loading = false
      },   
      
      
      //Role Assing into permissions
      [roleAssignPermission.pending]: (state) => {
        state.loading = true
      },
      [roleAssignPermission.fulfilled]: (state, { payload }) => {
          state.loading = false
          state.item = payload
      },
      [roleAssignPermission.rejected]: (state) => {
          state.loading = false
      },   

  }
});


export const {resetRoleSliceItem } = roleSlice.actions;

export default roleSlice.reducer;