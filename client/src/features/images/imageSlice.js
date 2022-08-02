import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import imageService from "./imageService";

const initialState = {
   image: {},
};

export const getImage = createAsyncThunk("images/getImage", async (id) => {
   const response = await imageService.getImage(id);
   return response;
});

export const uploadImage = createAsyncThunk(
   "image/uploadImage",
   async (image) => {
      return await imageService.uploadImage(image);
   }
);

export const deleteImage = createAsyncThunk("image/deleteImage", async (id) => {
   return await imageService.deleteImage(id);
});

export const imageSlice = createSlice({
   name: "image",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getImage.pending, (state, action) => {
            state.image = {};
         })
         .addCase(getImage.fulfilled, (state, action) => {
            state.image = action.payload;
         })
         .addCase(getImage.rejected, (state, action) => {
            state.image = {};
         })
         .addCase(uploadImage.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(uploadImage.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            console.log(action.payload);
            state.image = action.payload;
         })
         .addCase(uploadImage.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
         })
         .addCase(deleteImage.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(deleteImage.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.image = action.payload;
         })
         .addCase(deleteImage.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
         });
   },
});

export default imageSlice.reducer;
