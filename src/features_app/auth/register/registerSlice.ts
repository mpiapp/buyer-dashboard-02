import { createSlice } from '@reduxjs/toolkit';
import swal from 'sweetalert'
import {
  RegisterState
} from './registerTypes'
import {registerAction} from './reducers/registerReducers'

const initialState: RegisterState = {
  register: false, 
  loading : false,
  error : null
};

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerAction.fulfilled, (state, action:any) => {
        state.loading = false;
        state.register = true;
        swal("Succesfully Register", "We've sent link to your email. Please verify your email to continue...", 'success')

      })
      .addCase(registerAction.rejected, (state, action : any) => {
        state.loading = false;
        state.error = action.payload; 
        swal("Error", `${action.payload.message}`, 'error')
      })
  },
});

export default registerSlice.reducer;
