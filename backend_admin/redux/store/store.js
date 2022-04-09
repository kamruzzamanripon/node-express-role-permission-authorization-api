import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from 'next-redux-wrapper';
//import category from '../store_slices/category';
import reducer from '../store_slices/index';

const devMode = process.env.NODE_ENV === 'development';

// export const makeStore = ()=> configureStore({
//   reducer: {
//     category
//   }
// });
export const makeStore = ()=> configureStore({
  reducer: {
    store:reducer,
    devTools: devMode,
  }
});

export const wrapper = createWrapper(makeStore, {
    debug: devMode,
 });
