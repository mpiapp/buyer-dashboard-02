import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const approvePurchaseRequests = createAsyncThunk(
    'purchase-requests/approve',
    async (value : any, { rejectWithValue }) => {
        try {
            const body = {
                name : value.name,
                note : value.note,
                lastStatus : value.lastStatus
            }
            const response : any = await axios.put(`${process.env.REACT_APP_API_SERVER}/purchase-request/approved/${value.id}`, body)
            if(response) { 
                return { data : true, message : "Success approve purchase request!", type : value.type }
            } else {
                return rejectWithValue("Error approve purchase request")
            }
          } catch (err : any) {
            if (!err.response) {
              throw err
            }
            return rejectWithValue(err.response)
        }
    }
);


export const rejectPurchaseRequests = createAsyncThunk(
    'purchase-requests/reject',
    async (value : any, { rejectWithValue }) => {
        try {
            const body = {
                name : value.name,
                note : value.note,
                lastStatus : value.lastStatus
            }
            const response : any = await axios.put(`${process.env.REACT_APP_API_SERVER}/purchase-request/reject/${value.id}`, body)
            if(response) { 
                return { data : true, message : "Success rejected purchase request!" }
            } else {
                return rejectWithValue("Error reject purchase request")
            }
          } catch (err : any) {
            if (!err.response) {
              throw err
            }
            return rejectWithValue(err.response)
        }
    }
);
