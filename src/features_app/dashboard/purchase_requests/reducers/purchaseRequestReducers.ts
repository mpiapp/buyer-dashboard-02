import { createAsyncThunk } from '@reduxjs/toolkit';
import { userCredentials } from '../../../../utilities/config';
import axios from 'axios';

export const getPurchaseRequestData = createAsyncThunk(
    'purchase-requests/get',
    async (_, { rejectWithValue }) => {
        try {
            const response : any = await axios.get(`${process.env.REACT_APP_API_SERVER}/purchase-request`, {
                params : {
                    id : userCredentials.buyer_id
                }
            })
            if(response.data.errors === null) { 
                localStorage.setItem('purchase_requests', JSON.stringify(response.data.data))
                return {data : response.data.data, message : response.data.message}
            } else {
                return rejectWithValue(response.data.message)
            }
          } catch (err : any) {
            return rejectWithValue(err)
        }
    }
);


export const removePurchaseRequestData = createAsyncThunk(
    'purchase-requests/remove',
    async (id : string, { rejectWithValue }) => {
        try {
            const response : any = await axios.delete(`${process.env.REACT_APP_API_SERVER}/purchase-request/${id}`)
            if(response.data.errors === null) { 
                return {data : true, message : response.data.message}
            } else {
                return rejectWithValue(response.data.message)
            }
          } catch (err : any) {
            return rejectWithValue(err)
        }
    }
);

