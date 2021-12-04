import { createSlice } from '@reduxjs/toolkit';
import swal from 'sweetalert'
import { userCredentials } from '../../../utilities/config'
// import { useNavigate } from 'react-router-dom';
import {
  DataUser,
  LoginState
} from './loginTypes'
import {loginAction} from './reducers/loginReducers'

// const navigate = useNavigate()

export const checkInitalLogin = (user : any) => {
  let login = false
  if(user !== null) {
    login = user.login
  } 
  return login;
}

export const checkDataUser = (user : any) => {
  let data = {}
  if(user !== null) {
    data = user
  } 
  /* istanbul ignore file */
  return data;
}

const initialState: LoginState = {
  login: checkInitalLogin(userCredentials), 
  data : checkDataUser(userCredentials) as DataUser,
  loading : false,
  error : null
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginAction.fulfilled, (state, action:any) => {
        state.loading = false;
        state.login = true;
        state.data = action.payload;
        swal("Succesfully Login", "Now redirecting to dashboard...", 'success')
        // navigate('/dashboard', { replace: true });
      })
      .addCase(loginAction.rejected, (state, action : any) => {
        state.loading = false;
        state.error = action.payload; 
        swal("Error", `${action.payload.message}`, 'error')
      })
  },
});

export default loginSlice.reducer;
