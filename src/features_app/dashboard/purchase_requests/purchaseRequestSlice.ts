import { createSlice } from '@reduxjs/toolkit';
import swal from 'sweetalert'
// import {
//   IStatePurchaseRequest
// } from './purchaseRequestTypes'
import { getPurchaseRequestData, removePurchaseRequestData } from './reducers/purchaseRequestReducers';


const initialState: any = {
  data: [], 
  loading : true,
  error : null,
  remove: false,
  loading_remove: false,
};

export const getPurchaseRequest = createSlice({
  name: 'purchase-request',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get purchase request
      .addCase(getPurchaseRequestData.pending, (state) => {
        state.loading = true;
        state.remove = false;
      })
      .addCase(getPurchaseRequestData.fulfilled, (state, action:any) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(getPurchaseRequestData.rejected, (state, action : any) => {
        state.loading = false;
        state.error = action.payload; 
        swal("Error", `${action.payload.message}`, 'error')
      })

      // remove purchase request
      .addCase(removePurchaseRequestData.pending, (state) => {
        state.loading_remove = true;
      })
      .addCase(removePurchaseRequestData.fulfilled, (state, action:any) => {
        state.loading_remove = false;
        state.remove = action.payload.data;
        swal("Success", `${action.payload.message}`, 'success')
      })
      .addCase(removePurchaseRequestData.rejected, (state, action : any) => {
        state.loading_remove = false;
        swal("Error", `${action.payload.message}`, 'error')
      })
      
  },
});

export default getPurchaseRequest.reducer;
