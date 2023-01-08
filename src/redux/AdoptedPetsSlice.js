import { createSlice } from "@reduxjs/toolkit";

export const adoptedPetsSlice = createSlice({
  name: 'adoptedPets',
  initialState: {
    value: []
  },
  reducers: {
    adopt: (state, action) => {
      state.value = [action.payload, ...state.value];
    }
  }
})

export const { adopt } = adoptedPetsSlice.actions;
export default adoptedPetsSlice.reducer;
