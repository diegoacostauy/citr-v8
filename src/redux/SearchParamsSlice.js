import { createSlice } from "@reduxjs/toolkit";

const SearchParamsSlice = createSlice({
  name: "searchParams",
  initialState: {
    value: {
      location: "",
      animal: "",
      breed: ""
    }
  },
  reducers: {
    all: (state, action) => {
      state.value = action.payload;
    }
  }
});

export const { all } = SearchParamsSlice.actions;
export default SearchParamsSlice.reducer;
