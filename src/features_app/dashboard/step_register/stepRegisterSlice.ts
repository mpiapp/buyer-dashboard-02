import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  step_state: number
}

const initialState: CounterState = {
  step_state: 0,
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    changeStep: (state, action: PayloadAction<number>) => {
      state.step_state = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { changeStep } = counterSlice.actions

export default counterSlice.reducer