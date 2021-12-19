import { createSlice } from '@reduxjs/toolkit';
import swal from 'sweetalert'
import { getAllUsersTeams } from './reducers/teamsReducers';

const initialState: any = {
  data: [], 
  loading : false,
  error : null
};

export const stepRegisterVendor = createSlice({
  name: 'teams',
  initialState, 
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get all users
      .addCase(getAllUsersTeams.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUsersTeams.fulfilled, (state, action:any) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(getAllUsersTeams.rejected, (state, action : any) => {
        state.loading = false;
        state.error = action.payload; 
        swal("Error", `${action.payload}`, 'error')
      })
      
  },
});


export default stepRegisterVendor.reducer;
