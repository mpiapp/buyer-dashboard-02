import { createAsyncThunk } from '@reduxjs/toolkit';
import { userCredentials } from '../../../../utilities/config';
import axios from 'axios';

export const getPurchaseOrdersData = createAsyncThunk(
    'purchase-orders/get',
    async (_, { rejectWithValue }) => { 
        try {
            const response : any = await axios.get(`${process.env.REACT_APP_API_HOST}/purchase-order`, {
                params : {
                    id : userCredentials.buyerId
                }
            })
            if(response.data.errors === null) {
                return {data : response.data.data, message : response.data.message}
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

export const postProofDownPayment = createAsyncThunk(
    'purchase-orders/proof',
    async (body : any, { rejectWithValue }) => { 
        try {
            const response : any = await axios.post(`${process.env.REACT_APP_API_HOST}/fulfillment/Upload`, body)
            if(response.data.errors === null) {
                return {data : true, message : response.data.message}
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


