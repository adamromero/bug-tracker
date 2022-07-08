import axios from "axios";

const getTicketsByUser = async (userId) => {
   const response = await axios.get(`/api/ticket/user/${userId}`);
   return response.data;
};

const getTicket = async (ticketId) => {
   const response = await axios.get(`/api/ticket/${ticketId}`);
   return response.data;
};

const getProjectTickets = async (projectId) => {
   const response = await axios.get(`/api/ticket/project/${projectId}`);
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

const deleteTicket = async (id) => {
   const response = await axios.delete(`/api/ticket/${id}`);
   return response.data;
};

const ticketService = {
   getTicketsByUser,
   getTicket,
   getProjectTickets,
   createTicket,
   updateTicket,
   deleteTicket,
};

export default ticketService;
