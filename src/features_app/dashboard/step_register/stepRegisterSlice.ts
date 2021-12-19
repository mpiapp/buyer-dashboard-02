import { createSlice } from '@reduxjs/toolkit';
import swal from 'sweetalert'
import { postAddUserManagement, postCompanyDetail, postLegalDocument } from './reducers/stepRegisterReducers';


const initialState: any = {
  company_detail: false, 
  loading_comp_detail : false,
  error_comp_detail : null,
  legal_document: false, 
  loading_legal_document : false,
  error_legal_document : null,
  user: false, 
  loading_user : false,
  error_user : null,

};

export const stepRegisterVendor = createSlice({
  name: 'step-register',
  initialState, 
  reducers: {
    defaulCompanyDetail: (state) => {
      state.company_detail = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // put company detail
      .addCase(postCompanyDetail.pending, (state) => {
        state.loading_comp_detail = true;
      })
      .addCase(postCompanyDetail.fulfilled, (state, action:any) => {
        state.loading_comp_detail = false;
        state.company_detail = action.payload.data;
        swal("Success", `${action.payload.message}`, 'success')

      })
      .addCase(postCompanyDetail.rejected, (state, action : any) => {
        state.loading_comp_detail = false;
        state.error_comp_detail = action.payload; 
        swal("Error", `${action.payload}`, 'error')
      })
      // put legal document
      .addCase(postLegalDocument.pending, (state) => {
        state.loading_legal_document = true;
      })
      .addCase(postLegalDocument.fulfilled, (state, action:any) => {
        state.loading_legal_document = false;
        state.legal_document = action.payload.data;
        swal("Success", `${action.payload.message}`, 'success')

      })
      .addCase(postLegalDocument.rejected, (state, action : any) => {
        state.loading_legal_document = false;
        state.error_legal_document = action.payload; 
        swal("Error", `${action.payload}`, 'error')
      })
      // put user management
      .addCase(postAddUserManagement.pending, (state) => {
        state.loading_user = true;
      })
      .addCase(postAddUserManagement.fulfilled, (state, action:any) => {
        state.loading_user = false;
        state.user = action.payload.data;
        swal("Success", `${action.payload.message}`, 'success')

      })
      .addCase(postAddUserManagement.rejected, (state, action : any) => {
        state.loading_user = false;
        state.error_user = action.payload; 
        swal("Error", `${action.payload}`, 'error')
      })
      
  },
});

export const { defaulCompanyDetail } = stepRegisterVendor.actions

export default stepRegisterVendor.reducer;
