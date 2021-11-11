import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    username: localStorage.getItem("logged"),
    isLoggedIn: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload;
    },
    setLogin: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { setUser, setLogin } = userSlice.actions;
export default userSlice.reducer;
