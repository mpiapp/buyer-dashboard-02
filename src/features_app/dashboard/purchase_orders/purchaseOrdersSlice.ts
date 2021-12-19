import { createSlice } from '@reduxjs/toolkit';
import swal from 'sweetalert'
import {
  IStatePurchaseOrders
} from './purchaseOrdersTypes'
import { getPurchaseOrdersData, postApprovalReject, postGoodReceiptNote, postProofDownPayment } from './reducers/purchaseOrdersReducers';


const initialState: IStatePurchaseOrders = {
  data: [], 
  proof : false,
  loading_proof: false,
  loading : false,
  error : null,
  error_proof : null,
  item_pick : false,
  loading_item_pick: false,
  grn : false,
  loading_grn: false,
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
        swal("Error", `${action.payload}`, 'error')
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
        swal("Error", `${action.payload}`, 'error')
      })
      // post approval or reject item
      .addCase(postApprovalReject.pending, (state) => {
        state.loading_item_pick = true;
      })
      .addCase(postApprovalReject.fulfilled, (state, action:any) => {
        state.loading_item_pick = false;
        state.item_pick = action.payload.data;
        swal("Success", `${action.payload.message}`, 'success')
        setTimeout(() => {
          window.location.reload()
        }, 1000);
      })
      .addCase(postApprovalReject.rejected, (state, action : any) => {
        state.loading_item_pick = false;
        swal("Error", `${action.payload}`, 'error')
      })
       // post grn
       .addCase(postGoodReceiptNote.pending, (state) => {
        state.loading_grn = true;
      })
      .addCase(postGoodReceiptNote.fulfilled, (state, action:any) => {
        state.loading_grn = false;
        state.grn = action.payload.data;
        swal("Success", `${action.payload.message}`, 'success')
        setTimeout(() => {
          window.location.reload()
        }, 1000);

      })
      .addCase(postGoodReceiptNote.rejected, (state, action : any) => {
        state.loading_grn = false;
        swal("Error", `${action.payload}`, 'error')
      })
  },
});

export default getPurchaseOrders.reducer;
