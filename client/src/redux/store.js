import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";
import todosSlice from "./todos/todosSlice";
export const store = configureStore({
  reducer: {
    user: userSlice,
    todos: todosSlice,
  },
});
