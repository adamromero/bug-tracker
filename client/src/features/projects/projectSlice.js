import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import projectService from "./projectService";

const initialState = {
   projects: [],
   isLoading: false,
   isError: false,
   isSuccess: false,
   message: "",
};

export const getProjects = createAsyncThunk("project/getProjects", async () => {
   return await projectService.getProjects();
});

export const getProject = createAsyncThunk("project/getProject", async (id) => {
   return await projectService.getProject(id);
});

export const projectSlice = createSlice({
   name: "project",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getProjects.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(getProjects.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.projects = action.payload;
         })
         .addCase(getProjects.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
         })
         .addCase(getProject.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(getProject.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.projects = action.payload;
         })
         .addCase(getProject.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
         });
   },
});

export default projectSlice.reducer;
