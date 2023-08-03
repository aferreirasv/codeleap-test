import { createSlice } from "@reduxjs/toolkit";

export const editPostSlice = createSlice({
  name: "editPost",
  initialState: {
    value: {
      title: "",
      content: "",
    },
  },
  reducers: {
    updateTitle: (state, action) => {
      state.value.title = action.payload;
    },
    updateContent: (state, action) => {
      state.value.content = action.payload;
    },
    update: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateTitle, updateContent, update } = editPostSlice.actions;

export default editPostSlice.reducer;
