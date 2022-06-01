import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ticketService from "./ticketService";

const initialState = {
   tickets: [],
   ticket: {},
   isLoading: false,
   isError: false,
   isSuccess: false,
   message: "",
};

export const getTickets = createAsyncThunk("ticket/getTickets", async () => {
   return await ticketService.getTickets();
});

export const getTicket = createAsyncThunk("ticket/getTicket", async (id) => {
   return await ticketService.getTicket(id);
});

export const createTicket = createAsyncThunk(
   "ticket/createTicket",
   async (ticket) => {
      return await ticketService.createTicket(ticket);
   }
);

export const updateTicket = createAsyncThunk(
   "ticket/updateTicket",
   async (ticket) => {
      return await ticketService.updateTicket(ticket);
   }
);

export const deleteTicket = createAsyncThunk(
   "ticket/deleteTicket",
   async (id) => {
      return await ticketService.deleteTicket(id);
   }
);

export const ticketSlice = createSlice({
   name: "ticket",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getTickets.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(getTickets.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.tickets = action.payload;
         })
         .addCase(getTickets.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
         })
         .addCase(getTicket.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(getTicket.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.ticket = action.payload;
         })
         .addCase(getTicket.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
         });
   },
});

export default ticketSlice.reducer;
