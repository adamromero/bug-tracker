import axios from "axios";

const getTickets = async () => {
   const response = await axios.get("/api/ticket");
   return response.data;
};

const getTicket = async (id) => {
   const response = await axios.get(`/api/ticket/${id}`);
   return response.data;
};

const createTicket = async (ticket) => {
   const response = await axios.post("/api/ticket", ticket);
   return response.data;
};

const updateTicket = async (ticket) => {
   const response = await axios.put(`/api/ticket/${ticket.id}`, ticket);
   return response.data;
};

const deleteTicket = async (id) => {
   const response = await axios.delete(`/api/ticket/${id}`);
   return response.data;
};

const ticketService = {
   getTickets,
   getTicket,
   createTicket,
   updateTicket,
   deleteTicket,
};

export default ticketService;
