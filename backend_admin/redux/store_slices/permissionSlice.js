import { createSlice } from "@reduxjs/toolkit";
import { permissionsAllWithGroupWise } from "../data_fetch/permissionDataFetch";




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

  }
});


export const {resetPermissionSliceItem } = permissionSlice.actions;

export default permissionSlice.reducer;