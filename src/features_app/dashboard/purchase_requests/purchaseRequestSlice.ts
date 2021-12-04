import { createSlice } from '@reduxjs/toolkit';
import swal from 'sweetalert'
import {
  IStatePurchaseRequest
} from './purchaseRequestTypes'
import { getPurchaseRequestData } from './reducers/purchaseRequestReducers';


const initialState: IStatePurchaseRequest = {
  data: [], 
  loading : true,
  error : null,
};

export const getPurchaseRequest = createSlice({
  name: 'purchase-request',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get purchase request from db
      .addCase(getPurchaseRequestData.pending, (state) => {
        state.loading = true;
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
      
  },
});

export default getPurchaseRequest.reducer;
