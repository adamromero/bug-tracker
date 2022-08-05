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

export const updateUser = createAsyncThunk("users/updateUser", async (user) => {
   return await allUsersService.updateUser(user);
});

export const deleteUser = createAsyncThunk("users/deleteUser", async (id) => {
   return await allUsersService.deleteUser(id);
});

export const allUsersSlice = createSlice({
   name: "users",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(updateUser.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(updateUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.allUsers = state.allUsers.filter((user) => {
               if (user._id === action.payload._id) {
                  return action.payload;
               }
               return user;
            });
         })
         .addCase(updateUser.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
         })
         .addCase(getUsers.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(getUsers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.allUsers = action.payload;
         })
         .addCase(getUsers.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
         })
         .addCase(deleteUser.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(deleteUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.allUsers = state.allUsers.filter(
               (user) => user._id !== action.payload._id
            );
         })
         .addCase(deleteUser.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
         });
   },
});

export default allUsersSlice.reducer;
