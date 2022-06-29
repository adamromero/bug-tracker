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

export const getTicketsByUser = createAsyncThunk(
   "ticket/getTickets",
   async (id) => {
      return await ticketService.getTicketsByUser(id);
   }
);

export const getTicket = createAsyncThunk("ticket/getTicket", async (id) => {
   return await ticketService.getTicket(id);
});

export const getProjectTickets = createAsyncThunk(
   "ticket/getProjectTickets",
   async (id) => {
      return await ticketService.getProjectTickets(id);
   }
);

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
         .addCase(getTicketsByUser.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(getTicketsByUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.tickets = action.payload;
         })
         .addCase(getTicketsByUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
         })
         .addCase(getProjectTickets.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(getProjectTickets.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.tickets = action.payload;
         })
         .addCase(getProjectTickets.rejected, (state, action) => {
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
         })
         .addCase(createTicket.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(createTicket.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.tickets.push(action.payload);
         })
         .addCase(createTicket.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
         })
         .addCase(updateTicket.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(updateTicket.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.ticket = action.payload;
         })
         .addCase(updateTicket.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
         })
         .addCase(deleteTicket.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(deleteTicket.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.tickets = state.tickets.filter(
               (ticket) => ticket.id !== action.payload
            );
         })
         .addCase(deleteTicket.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
         });
   },
});

export default ticketSlice.reducer;
