import { createSlice } from "@reduxjs/toolkit";

export const usernameSlice = createSlice({
  name: "username",
  initialState: {
    value: "",
  },
  reducers: {
    update: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { update } = usernameSlice.actions;

export default usernameSlice.reducer;
