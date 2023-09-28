import { createSlice } from "@reduxjs/toolkit"; // manage states of pages

// Initialize state
const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

// Functions to manipulate initialState
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {            // action: parameters to the login function
      state.user = action.payload.user;       // payload: to set the parameter to the state of 'user'
      state.token = action.payload.token;
    },
    setLogout: (state) => {                    // reset state to null when logged out
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {        // check if user has friends and returns them as payload
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setPosts: (state, action) => {          // setPost function to set post params to 'post'
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts; // will explain later
    },
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
  authSlice.actions;
export default authSlice.reducer;
