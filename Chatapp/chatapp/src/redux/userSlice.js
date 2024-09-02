import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    authUser: null,
    otherUsers: null,
    selectedUser: null,
    onlineUsers: null,
  },

  reducers: {
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },
    setGetOtherUser: (state, action) => {
      state.otherUsers = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
  },
});

export const { setAuthUser, setGetOtherUser, setSelectedUser,setOnlineUsers } =
  userSlice.actions;


  export const loadAuthUserFromLocalStorage = () => (dispatch) => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      dispatch(setAuthUser(JSON.parse(storedUser)));
    }
  };
export default userSlice.reducer;
