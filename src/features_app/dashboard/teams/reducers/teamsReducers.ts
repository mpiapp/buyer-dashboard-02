import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { userCredentials } from '../../../../utilities/config';

export const getAllUsersTeams = createAsyncThunk(
    'get/userteams',
    async (_, { rejectWithValue }) => { 
        try {
            const response : any = await axios.get(`${process.env.REACT_APP_API_SERVER}/buyer/users`, {
                params : {
                    "buyer_id": userCredentials.buyer_id
                }
            })
            if(response.data.errors === null) {
                let message = response.data.message
                return {data : response.data.data, message : message}
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

