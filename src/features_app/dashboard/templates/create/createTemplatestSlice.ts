import { createSlice } from '@reduxjs/toolkit';
import swal from 'sweetalert'
import { 
  addQuantityProductTemplate, 
  addToLocalDBTemplate, 
  getLocalDBTemplate, 
  removeItemProductTemplate, 
  removeQuantityProductTemplate, 
  removeVendorItemsTemplate, 
  resetCartTemplate, 
  saveTemplate 
} from './reducers/createNewTemplateReducers';

// import {
//   ICartPurchaseRequests
// } from '../purchaseRequestTypes'



const initialState: any = {
  carts: [], 
  loading : true,
  error : null,
  loading_add : false,
  error_add : null,
  success_add : false,
  success_reset : false,
  message_snackbar : null,
  success_save: false,
  loading_save: false,
  error_save: null
};

export const createTemplates = createSlice({
  name: 'template',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get local db
      .addCase(getLocalDBTemplate.pending, (state) => {
        state.loading = true;
        state.success_add = false
        state.success_save = false
        state.success_reset = false
      })
      .addCase(getLocalDBTemplate.fulfilled, (state, action:any) => {
        state.loading = false;
        state.carts = action.payload;
      })
      .addCase(getLocalDBTemplate.rejected, (state, action : any) => {
        state.loading = false;
        state.error = action.payload; 
        swal("Error", `${action.payload.message}`, 'error')
      })
      // add item to local db
      .addCase(addToLocalDBTemplate.pending, (state) => {
        state.loading_add = true;
      })
      .addCase(addToLocalDBTemplate.fulfilled, (state, action:any) => {
        state.loading_add = false;
        state.success_add = action.payload.success;
        state.message_snackbar = action.payload.message
      })
      .addCase(addToLocalDBTemplate.rejected, (state, action : any) => {
        state.loading_add = false;
        state.error_add = action.payload; 
        swal("Error", `${action.payload.message}`, 'error')
      })
      // increase quantity item from local db
      .addCase(addQuantityProductTemplate.pending, (state) => {
        state.loading_add = true;
      })
      .addCase(addQuantityProductTemplate.fulfilled, (state, action:any) => {
        state.loading_add = false;
        state.success_add = action.payload.success;
        state.message_snackbar = action.payload.message
      })
      .addCase(addQuantityProductTemplate.rejected, (state, action : any) => {
        state.loading_add = false;
        state.error_add = action.payload; 
        swal("Error", `${action.payload.message}`, 'error')
      })
      // decrease quantity item from local db
      .addCase(removeQuantityProductTemplate.pending, (state) => {
        state.loading_add = true;
      })
      .addCase(removeQuantityProductTemplate.fulfilled, (state, action:any) => {
        state.loading_add = false;
        state.success_add = action.payload.success;
        state.message_snackbar = action.payload.message
      })
      .addCase(removeQuantityProductTemplate.rejected, (state, action : any) => {
        state.loading_add = false;
        state.error_add = action.payload; 
        swal("Error", `${action.payload.message}`, 'error')
      })
      // remove item from local db
      .addCase(removeItemProductTemplate.pending, (state) => {
        state.loading_add = true;
      })
      .addCase(removeItemProductTemplate.fulfilled, (state, action:any) => {
        state.loading_add = false;
        state.success_add = action.payload.success;
        state.message_snackbar = action.payload.message
      })
      .addCase(removeItemProductTemplate.rejected, (state, action : any) => {
        state.loading_add = false;
        state.error_add = action.payload; 
        swal("Error", `${action.payload.message}`, 'error')
      })
      // remove all item by vendor from local db
      .addCase(removeVendorItemsTemplate.pending, (state) => {
        state.loading_add = true;
      })
      .addCase(removeVendorItemsTemplate.fulfilled, (state, action:any) => {
        state.loading_add = false;
        state.success_add = action.payload.success;
        state.message_snackbar = action.payload.message
      })
      .addCase(removeVendorItemsTemplate.rejected, (state, action : any) => {
        state.loading_add = false;
        state.error_add = action.payload; 
        swal("Error", `${action.payload.message}`, 'error')
      })
      // remove all item from local db
      .addCase(resetCartTemplate.pending, (state) => {
        state.loading_add = true;
      })
      .addCase(resetCartTemplate.fulfilled, (state, action:any) => {
        state.loading_add = false;
        state.success_reset = action.payload.success;
        state.message_snackbar = action.payload.message;
        window.location.reload()
      })
      .addCase(resetCartTemplate.rejected, (state, action : any) => {
        state.loading_add = false;
        state.error_add = action.payload; 
        swal("Error", `${action.payload.message}`, 'error')
      })
      // save purchase request 
      .addCase(saveTemplate.pending, (state) => {
        state.loading_save = true;
      })
      .addCase(saveTemplate.fulfilled, (state, action:any) => {
        state.loading_save = false;
        state.success_save = action.payload.success;
        swal("Success", `${action.payload.message}`, 'success')
      })
      .addCase(saveTemplate.rejected, (state, action : any) => {
        state.loading_save = false;
        state.error_save = action.payload; 
        swal("Error", `${action.payload.message}`, 'error')
      })

  },
});

export default createTemplates.reducer;
