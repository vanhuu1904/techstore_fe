import { createSlice } from "@reduxjs/toolkit";

const initialState = { user: null, isAuthenticated: false, loading: true };

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setIsAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { setUser, setIsAuthenticated, setLoading } = userSlice.actions;
export default userSlice.reducer;
