import { createAsyncThunk } from '@reduxjs/toolkit';
import { userCredentials } from '../../../../utilities/config';
import axios from 'axios';

export const getPurchaseOrdersData = createAsyncThunk(
    'purchase-orders/get',
    async (_, { rejectWithValue }) => { 
        try {
            const response : any = await axios.get(`${process.env.REACT_APP_API_SERVER}/purchase-order`, {
                params : {
                    id : userCredentials.buyer_id
                }
            })
            if(response.data.errors === null) {
                return {data : response.data.data, message : response.data.message}
            } else {
                return rejectWithValue(response.data.message)
            }
          } catch (err : any) {
            return rejectWithValue(err)
        }
    }
);

export const postProofDownPayment = createAsyncThunk(
    'purchase-orders/proof',
    async (body : any, { rejectWithValue }) => { 
        try {
            const response : any = await axios.post(`${process.env.REACT_APP_API_SERVER}/fulfillment/Upload`, body)
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


export const postApprovalReject = createAsyncThunk(
    'purchase-orders/approve-reject',
    async (body : any, { rejectWithValue }) => { 
        try {
            const response : any = await axios.post(`${process.env.REACT_APP_API_SERVER}/purchase-order/${body.status}`, body.data)
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


export const postGoodReceiptNote = createAsyncThunk(
    'purchase-orders/grn',
    async (body : any, { rejectWithValue }) => { 
        try {
            const response : any = await axios.put(`${process.env.REACT_APP_API_SERVER}/grn/${body.reference_doc.packageId}`, body)
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

