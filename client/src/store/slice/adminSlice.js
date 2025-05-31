import { createSlice } from "@reduxjs/toolkit";

const storedAdmin = localStorage.getItem("admin");

const initialState = {
  admin: storedAdmin ? JSON.parse(storedAdmin) : null,
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    adminLogin(state, action) {
      state.loading = false;
      state.admin = action.payload;
      localStorage.setItem("admin", JSON.stringify(action.payload));
    },
    adminLogout(state) {
      state.admin = null;
      state.error = null;
      localStorage.removeItem("admin");
    },
  },
});

export const { adminLogin, adminLogout } = adminSlice.actions;
export default adminSlice.reducer;
