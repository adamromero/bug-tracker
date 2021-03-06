import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
   user: user ? user : null,
   isLoading: false,
   isError: false,
   isSuccess: false,
   message: "",
};

export const register = createAsyncThunk("auth/register", async (user) => {
   return await authService.register(user);
});

export const login = createAsyncThunk("auth/login", async (user) => {
   return await authService.login(user);
});

export const logout = createAsyncThunk("auth/logout", async () => {
   return await authService.logout();
});

export const updatePassword = createAsyncThunk(
   "auth/updatePassword",
   async (user) => {
      return await authService.updatePassword(user);
   }
);

export const authSlice = createSlice({
   name: "auth",
   initialState,
   reducers: {
      reset: (state) => {
         state.user = null;
         state.isLoading = false;
         state.isError = false;
         state.isSuccess = false;
         state.message = "";
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(register.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(register.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
         })
         .addCase(register.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
         })
         .addCase(login.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
         })
         .addCase(login.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
         })
         .addCase(updatePassword.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(updatePassword.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
         })
         .addCase(updatePassword.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
         });
   },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
