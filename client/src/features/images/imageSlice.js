import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import imageService from "./imageService";

const initialState = {
   image: {},
};

export const uploadImage = createAsyncThunk(
   "image/uploadImage",
   async (image) => {
      return await imageService.uploadImage(image);
   }
);

export const imageSlice = createSlice({
   name: "image",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(uploadImage.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(uploadImage.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.image = action.payload;
         })
         .addCase(uploadImage.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
         });
   },
});

export default imageSlice.reducer;
