import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { userCredentials } from '../../../../utilities/config';

export const getProfileCompany = createAsyncThunk(
    'profile',
    async (_, { rejectWithValue }) => { 
        try {
            const company : any = await axios.get(`${process.env.REACT_APP_API_SERVER}/buyer/detail?buyer_id=${userCredentials.buyer_id}`)
            if(company.data.errors === null) {
                // let buyer_detail = company.data.data

                // console.log(buyer_detail, 'buyer_detail')

                let message = company.data.message
                return {data : company.data.data, message : message}
            } else {
                return rejectWithValue(company.data.message)
            }
          } catch (err : any) {
            return rejectWithValue(err)
        }
    }
);
