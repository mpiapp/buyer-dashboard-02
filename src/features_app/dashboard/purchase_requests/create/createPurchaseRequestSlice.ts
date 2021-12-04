import { createSlice } from '@reduxjs/toolkit';
import swal from 'sweetalert'
import {
  ICartPurchaseRequests
} from '../purchaseRequestTypes'

import { 
    getLocalDBCarts,
    addToLocalDBCarts, 
    addQuantityProduct,
    removeQuantityProduct,
    removeItemProduct,
    removeVendorItems,
    resetCart,
    savePurchaseRequest,
    submitPurchaseRequest
} from './reducers/createPurchaseRequestReducers'


const initialState: ICartPurchaseRequests = {
  carts: [], 
  loading : true,
  error : null,
  loading_add : false,
  error_add : null,
  success_add : false,
  message_snackbar : null,
  success_save: false,
  loading_save: false,
  error_save: null,
  submit : false,
  loading_submit : false,
  error_submit : null
};

export const createPurchaseRequest = createSlice({
  name: 'carts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get local db
      .addCase(getLocalDBCarts.pending, (state) => {
        state.loading = true;
        state.success_add = false
        state.success_save = false
      })
      .addCase(getLocalDBCarts.fulfilled, (state, action:any) => {
        state.loading = false;
        state.carts = action.payload;
      })
      .addCase(getLocalDBCarts.rejected, (state, action : any) => {
        state.loading = false;
        state.error = action.payload; 
        swal("Error", `${action.payload.message}`, 'error')
      })
      // add item to local db
      .addCase(addToLocalDBCarts.pending, (state) => {
        state.loading_add = true;
      })
      .addCase(addToLocalDBCarts.fulfilled, (state, action:any) => {
        state.loading_add = false;
        state.success_add = action.payload.success;
        state.message_snackbar = action.payload.message
      })
      .addCase(addToLocalDBCarts.rejected, (state, action : any) => {
        state.loading_add = false;
        state.error_add = action.payload; 
        swal("Error", `${action.payload.message}`, 'error')
      })
      // increase quantity item from local db
      .addCase(addQuantityProduct.pending, (state) => {
        state.loading_add = true;
      })
      .addCase(addQuantityProduct.fulfilled, (state, action:any) => {
        state.loading_add = false;
        state.success_add = action.payload.success;
        state.message_snackbar = action.payload.message
      })
      .addCase(addQuantityProduct.rejected, (state, action : any) => {
        state.loading_add = false;
        state.error_add = action.payload; 
        swal("Error", `${action.payload.message}`, 'error')
      })
      // decrease quantity item from local db
      .addCase(removeQuantityProduct.pending, (state) => {
        state.loading_add = true;
      })
      .addCase(removeQuantityProduct.fulfilled, (state, action:any) => {
        state.loading_add = false;
        state.success_add = action.payload.success;
        state.message_snackbar = action.payload.message
      })
      .addCase(removeQuantityProduct.rejected, (state, action : any) => {
        state.loading_add = false;
        state.error_add = action.payload; 
        swal("Error", `${action.payload.message}`, 'error')
      })
      // remove item from local db
      .addCase(removeItemProduct.pending, (state) => {
        state.loading_add = true;
      })
      .addCase(removeItemProduct.fulfilled, (state, action:any) => {
        state.loading_add = false;
        state.success_add = action.payload.success;
        state.message_snackbar = action.payload.message
      })
      .addCase(removeItemProduct.rejected, (state, action : any) => {
        state.loading_add = false;
        state.error_add = action.payload; 
        swal("Error", `${action.payload.message}`, 'error')
      })
      // remove all item by vendor from local db
      .addCase(removeVendorItems.pending, (state) => {
        state.loading_add = true;
      })
      .addCase(removeVendorItems.fulfilled, (state, action:any) => {
        state.loading_add = false;
        state.success_add = action.payload.success;
        state.message_snackbar = action.payload.message
      })
      .addCase(removeVendorItems.rejected, (state, action : any) => {
        state.loading_add = false;
        state.error_add = action.payload; 
        swal("Error", `${action.payload.message}`, 'error')
      })
      // remove all item from local db
      .addCase(resetCart.pending, (state) => {
        state.loading_add = true;
      })
      .addCase(resetCart.fulfilled, (state, action:any) => {
        state.loading_add = false;
        state.success_add = action.payload.success;
        state.message_snackbar = action.payload.message
      })
      .addCase(resetCart.rejected, (state, action : any) => {
        state.loading_add = false;
        state.error_add = action.payload; 
        swal("Error", `${action.payload.message}`, 'error')
      })
      // save purchase request 
      .addCase(savePurchaseRequest.pending, (state) => {
        state.loading_save = true;
      })
      .addCase(savePurchaseRequest.fulfilled, (state, action:any) => {
        state.loading_save = false;
        state.success_save = action.payload.success;
        swal("Success", `${action.payload.message}`, 'success')
      })
      .addCase(savePurchaseRequest.rejected, (state, action : any) => {
        state.loading_save = false;
        state.error_save = action.payload; 
        swal("Error", `${action.payload.message}`, 'error')
      })
      // submit purchase request 
      .addCase(submitPurchaseRequest.pending, (state) => {
        state.loading_submit = true;
      })
      .addCase(submitPurchaseRequest.fulfilled, (state, action:any) => {
        state.loading_submit = false;
        state.submit = action.payload.submit;
        swal("Success", `${action.payload.message}`, 'success')
      })
      .addCase(submitPurchaseRequest.rejected, (state, action : any) => {
        state.loading_submit = false;
        state.error_submit = action.payload; 
        swal("Error", `${action.payload.message}`, 'error')
      })
  },
});

export default createPurchaseRequest.reducer;
