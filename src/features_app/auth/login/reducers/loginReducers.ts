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
            const response : any = await Axios.post(`${process.env.REACT_APP_API_URL_USERS}/buyer/login`, body)
            if(response) {
                let headers = {
                    'Content-Type': 'application/json',
                    'token': response.data.access_token
                }
                try {
                    const profil : any = await Axios.post(`${process.env.REACT_APP_API_URL_USERS}/buyer/user-access`, {}, {
                        headers: headers
                    })
                    if(profil) {
                        let data = {
                            access_token : response.data.access_token,
                            id_token : response.data.id_token, 
                            expires_in : response.data.expires_in,
                            email : profil.data.email,
                            fullname : profil.data.fullname, 
                            role : profil.data.role, 
                            avatar : profil.data.avatar,
                            auth_id : profil.data.auth_id,
                            first_time : false,
                            login: true,
                            buyerId : 'arisbuyerdummy2021',
                            code : 'MPINDO'
                        }
                        const saveToLocalStorage = crypto.AES.encrypt(JSON.stringify(data), `${process.env.REACT_APP_CRYPTO_SECRET}`).toString();
                        localStorage.setItem('_?credentials', saveToLocalStorage)
                        return data
                    }
                } catch (err : any) {
                    if (!err.profil) {
                        throw err
                    }
                    return rejectWithValue(err.profil.data)
                }
            }
          } catch (err : any) {
            if (!err.response) {
              throw err
            }
            return rejectWithValue(err.response.data)
        }
    }
  );

/* istanbul ignore file */
