import { createSlice } from '@reduxjs/toolkit';
import swal from 'sweetalert'
import { approvePurchaseRequests, rejectPurchaseRequests } from './reducers/detailPurchaseRequestReducers';


const initialState: any = {
  approve: false, 
  loading_reject : false,
  loading_approved : false,
  error : null,
};

export const approvePurchaseRequest = createSlice({
  name: 'purchase-request/approve',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // approve pr
      .addCase(approvePurchaseRequests.pending, (state) => {
        state.loading_approved = true;
      })
      .addCase(approvePurchaseRequests.fulfilled, (state, action:any) => {
        state.loading_approved = false;
        state.approve = action.payload.data;
        swal("Success", `${action.payload.message}`, 'success')

      })
      .addCase(approvePurchaseRequests.rejected, (state, action : any) => {
        state.loading_approved = false;
        state.error = action.payload; 
        swal("Error", `${action.payload.message}`, 'error')
      })
      .addCase(rejectPurchaseRequests.pending, (state) => {
        state.loading_reject = true;
      })
      // reject pr
      .addCase(rejectPurchaseRequests.fulfilled, (state, action:any) => {
        state.loading_reject = false;
        state.approve = action.payload.data;
        swal("Success", `${action.payload.message}`, 'success')

      })
      .addCase(rejectPurchaseRequests.rejected, (state, action : any) => {
        state.loading_reject = false;
        state.error = action.payload; 
        swal("Error", `${action.payload.message}`, 'error')
      })
      
  },
});

export default approvePurchaseRequest.reducer;
