import { configureStore } from "@reduxjs/toolkit";
import usernameReducer from "./username";
import editPostReducer from "./editPost";

export default configureStore({
  reducer: {
    username: usernameReducer,
    editPost: editPostReducer,
  },
});
