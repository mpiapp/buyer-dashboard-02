import { createSlice } from '@reduxjs/toolkit';
import swal from 'sweetalert'
import { getProfileCompany } from './reducers/profilesReducers';

const initialState: any = {
  data: [], 
  loading : true,
};

export const getCompanyProfile = createSlice({
  name: 'profile/get',
  initialState, 
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get profile
      .addCase(getProfileCompany.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProfileCompany.fulfilled, (state, action:any) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(getProfileCompany.rejected, (state, action : any) => {
        state.loading = false;
        state.error = action.payload; 
        swal("Error", `${action.payload}`, 'error')
      })
      
  },
});

export default getCompanyProfile.reducer;
