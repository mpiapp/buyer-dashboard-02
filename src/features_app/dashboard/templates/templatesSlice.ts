import { createSlice } from '@reduxjs/toolkit';
import swal from 'sweetalert'
// import {
//   IStatePurchaseRequest
// } from './purchaseRequestTypes'
import { getTemplatesData, removeTemplatesData, } from './reducers/templatesReducers';


const initialState: any = {
  data: [], 
  loading : true,
  error : null,
  remove: false,
  loading_remove: false,
};

export const getTemplates = createSlice({
  name: 'templates',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get purchase request
      .addCase(getTemplatesData.pending, (state) => {
        state.loading = true;
        state.remove = false;
      })
      .addCase(getTemplatesData.fulfilled, (state, action:any) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(getTemplatesData.rejected, (state, action : any) => {
        state.loading = false;
        state.error = action.payload; 
        swal("Error", `${action.payload.message}`, 'error')
      })

      // remove purchase request
      .addCase(removeTemplatesData.pending, (state) => {
        state.loading_remove = true;
      })
      .addCase(removeTemplatesData.fulfilled, (state, action:any) => {
        state.loading_remove = false;
        state.remove = action.payload.data;
        swal("Success", `${action.payload.message}`, 'success')
      })
      .addCase(removeTemplatesData.rejected, (state, action : any) => {
        state.loading_remove = false;
        swal("Error", `${action.payload.message}`, 'error')
      })
      
  },
});

export default getTemplates.reducer;
