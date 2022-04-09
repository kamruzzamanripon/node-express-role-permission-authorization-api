import { createSlice } from "@reduxjs/toolkit";



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
        

  }
});


export const {resetRoleSliceItem } = roleSlice.actions;

export default roleSlice.reducer;