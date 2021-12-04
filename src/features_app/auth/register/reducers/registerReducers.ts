import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'axios'
import {
    InputState
} from '../registerTypes'

export const registerAction = createAsyncThunk(
    'auth/register',
    async (value : InputState , { rejectWithValue }) => {
      try {
          const body = {
            email : value.email,
            password : value.password,
            fullname : value.fullname,
            buyer_id : "asdgadfe",
            role_id: "00"
          }
          localStorage.setItem('fullname', value.fullname)
          localStorage.setItem('legalname', value.company_name)
          const response = await Axios.post(`${process.env.REACT_APP_API_URL_USERS}/buyer/register`, body)
          return response.data
        } catch (err : any) {
          if (!err.response) {
            throw err
          }
          return rejectWithValue(err.response.data)
      }
    }
  );

/* istanbul ignore file */
