import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import commentService from "./commentService";

const initialState = {
   comments: [],
   isLoading: false,
   isError: false,
   isSuccess: false,
   message: "",
};

export const getComments = createAsyncThunk("comment/getComments", async () => {
   return await commentService.getComments();
});

export const createComment = createAsyncThunk(
   "comment/createComment",
   async (comment) => {
      return await commentService.createComment(comment);
   }
);

export const updateComment = createAsyncThunk(
   "comment/updateComment",
   async (comment) => {
      return await commentService.updateComment(comment);
   }
);

export const deleteComment = createAsyncThunk(
   "comment/deleteComment",
   async (id) => {
      return await commentService.deleteComment(id);
   }
);

export const commentSlice = createSlice({
   name: "comment",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getComments.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(getComments.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.comments = action.payload;
         })
         .addCase(getComments.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
         });
   },
});

export default commentSlice.reducer;
