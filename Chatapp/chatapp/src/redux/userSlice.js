import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    autUser: null,
  },

  reducers: {
    setAuthUser: (state, action) => {
      state.autUser = action.payload;
    },
  },
});

export const { setAuthUser } = userSlice.actions;
export default userSlice.reducer;
