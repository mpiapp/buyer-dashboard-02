import { createSlice } from '@reduxjs/toolkit';
import swal from 'sweetalert'
import {
  IStatePurchaseOrders
} from './purchaseOrdersTypes'
import { getPurchaseOrdersData, postProofDownPayment } from './reducers/purchaseOrdersReducers';


const initialState: IStatePurchaseOrders = {
  data: [], 
  proof : false,
  loading_proof: false,
  loading : false,
  error : null,
  error_proof : null,
};

export const getPurchaseOrders = createSlice({
  name: 'purchase-orders',
  initialState, 
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get purchase orders from db
      .addCase(getPurchaseOrdersData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPurchaseOrdersData.fulfilled, (state, action:any) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(getPurchaseOrdersData.rejected, (state, action : any) => {
        state.loading = false;
        state.error = action.payload; 
        swal("Error", `${action.payload.message}`, 'error')
      })
      // post proof
      .addCase(postProofDownPayment.pending, (state) => {
        state.loading_proof = true;
      })
      .addCase(postProofDownPayment.fulfilled, (state, action:any) => {
        state.loading_proof = false;
        state.proof = action.payload.data;
      })
      .addCase(postProofDownPayment.rejected, (state, action : any) => {
        state.loading_proof = false;
        state.error_proof = action.payload; 
        swal("Error", `${action.payload.message}`, 'error')
      })
  },
});

export default getPurchaseOrders.reducer;
