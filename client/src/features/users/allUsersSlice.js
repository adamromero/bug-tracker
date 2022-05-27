import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import allUsersService from "./allUsersService";

const initialState = {
   allUsers: [],
   isLoading: false,
   isError: false,
   isSuccess: false,
};

export const getUsers = createAsyncThunk("users/getUsers", async () => {
   return await allUsersService.getUsers();
});

export const allUsersSlice = createSlice({
   name: "users",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getUsers.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(getUsers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            //state.allUsers.push(action.payload);
            state.allUsers = action.payload;
         })
         .addCase(getUsers.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            //state.allUsers = action.payload;
         });
   },
});

export default allUsersSlice.reducer;
