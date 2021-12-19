import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const postCompanyDetail = createAsyncThunk(
    'company-detail',
    async (body : any, { rejectWithValue }) => { 
        try {
            const response : any = await axios.put(`${process.env.REACT_APP_API_SERVER}/buyer/company`, body)
            if(response.data.errors === null) {
                let message = response.data.message
                return {data : true, message : message}
            } else {
                return rejectWithValue(response.data.message)
            }
          } catch (err : any) {
            if (!err.response) {
              throw err
            }
            return rejectWithValue(err.response)
        }
    }
);

export const postLegalDocument = createAsyncThunk(
    'legal-document',
    async (body : any, { rejectWithValue }) => { 
        try {
            const response : any = await axios.put(`${process.env.REACT_APP_API_SERVER}/buyer/legaldocs`, body)
            if(response.data.errors === null) {
                let message = response.data.message
                return {data : true, message : message}
            } else {
                return rejectWithValue(response.data.message)
            }
          } catch (err : any) {
            if (!err.response) {
              throw err
            }
            return rejectWithValue(err.response)
        }
    }
);

export const postAddUserManagement = createAsyncThunk(
    'user-management',
    async (body : any, { rejectWithValue }) => { 
        try {
            const response : any = await axios.post(`${process.env.REACT_APP_API_SERVER}/buyer/user`, body)
            if(response.data.errors === null) {
                let message = response.data.message
                return {data : true, message : message}
            } else {
                return rejectWithValue(response.data.message)
            }
          } catch (err : any) {
            if (!err.response) {
              throw err
            }
            return rejectWithValue(err.response)
        }
    }
);
