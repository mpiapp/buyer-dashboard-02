import { createAsyncThunk } from '@reduxjs/toolkit';
import { userCredentials } from '../../../../utilities/config';
import axios from 'axios';

export const getTemplatesData = createAsyncThunk(
    'template/get',
    async (_, { rejectWithValue }) => {
        try {
            const response : any = await axios.get(`${process.env.REACT_APP_API_SERVER}/template`, {
                params : {
                    id : userCredentials.buyer_id
                }
            })
            if(response.data.errors === null) { 
                // localStorage.setItem('purchase_requests', JSON.stringify(response.data.data))
                return {data : response.data.data, message : response.data.message}
            } else {
                return rejectWithValue(response.data.message)
            }
          } catch (err : any) {
            return rejectWithValue(err)
        }
    }
);


export const removeTemplatesData = createAsyncThunk(
    'template/remove',
    async (id : string, { rejectWithValue }) => {
        try {
            const response : any = await axios.delete(`${process.env.REACT_APP_API_SERVER}/template/${id}`)
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

