import { createAsyncThunk } from '@reduxjs/toolkit';
import crypto from 'crypto-js'; 
import Axios from 'axios'
import {
    InputState
} from '../loginTypes'

export const loginAction = createAsyncThunk(
    'auth/login',
    async (value : InputState , { rejectWithValue }) => {

        const body = {
            email : value.email,
            password : value.password,
        }
        try {
            const response : any = await Axios.post(`${process.env.REACT_APP_API_SERVER}/user-buyer/login`, body)
            if(response.data.errors === null) {
                try {
                    const profil : any = await Axios.get(`${process.env.REACT_APP_API_SERVER}/user-buyer/${response.data.data.access_token}/access`)
                    if(profil.data.errors === null) {
                        let data = {
                            access_token : response.data.data.access_token,
                            id_token : response.data.data.id_token, 
                            expires_in : response.data.data.expires_in,
                            email : profil.data.data.email,
                            fullname : profil.data.data.fullname, 
                            role : profil.data.data.role, 
                            avatar : profil.data.data.avatar,
                            auth_id : profil.data.data.auth_id,
                            first_time : profil.data.data.isFirstTime,
                            login: true,
                            buyer_id : profil.data.data.buyer_id,
                            company_code : profil.data.data.company_code,
                            vendor_name : profil.data.data.vendor_name,
                        }
                        const saveToLocalStorage = crypto.AES.encrypt(JSON.stringify(data), `${process.env.REACT_APP_CRYPTO_SECRET}`).toString();
                        localStorage.setItem('_?credentials', saveToLocalStorage)
                        return data
                    } else {
                        return rejectWithValue(profil.data.message)
                    }
                } catch (err : any) {
                    if (!err.profil) {
                        throw err
                    }
                    return rejectWithValue(err.message)
                }
            } else {
                return rejectWithValue(response.data.message.error_description)
            }
          } catch (err : any) {
            if (!err.response) {
              throw err
            }
            return rejectWithValue(err.message)
        }
    }
  );

/* istanbul ignore file */
