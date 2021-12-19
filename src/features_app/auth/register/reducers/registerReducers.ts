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
            owner_email : value.email,
            owner_password : value.password,
            owner_name : value.fullname,
            company_name : value.company_name,
          }
          localStorage.setItem('legalname', value.company_name)
          const response : any = await Axios.post(`${process.env.REACT_APP_API_SERVER}/buyer/register`, body)
          if(response.data.errors === null) {
            // console.log(response, 'responsenn')
            return response.data
          } else {
            return rejectWithValue(response.data.message)
          }
        } catch (err : any) {
          if (!err.response) {
            throw err
          }
          return rejectWithValue(err)
      }
    }
  );

/* istanbul ignore file */
