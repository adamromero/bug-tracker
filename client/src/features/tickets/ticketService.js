import axios from "axios";

const getTickets = async (ticketId) => {
   const response = await axios.get(`/api/ticket/${ticketId}`);
   return response.data;
};

const getTicket = async (ticketId) => {
   const response = await axios.get(`/api/ticket/${ticketId}`);
   return response.data;
};

const getProjectTickets = async (ticketId) => {
   const response = await axios.get(`/api/ticket/${ticketId}`);
   return response.data;
};

const createTicket = async (ticket) => {
   const response = await axios.post(`/api/ticket/${ticket.id}`, ticket);
   return response.data;
};

const updateTicket = async (ticket) => {
   const response = await axios.put(`/api/ticket/${ticket.id}`, ticket);
   return response.data;
};

const deleteTicket = async (ticketId) => {
   const response = await axios.delete(`/api/ticket/${ticketId}`);
   return response.data;
};

const ticketService = {
   getTickets,
   getTicket,
   getProjectTickets,
   createTicket,
   updateTicket,
   deleteTicket,
};

export default ticketService;
