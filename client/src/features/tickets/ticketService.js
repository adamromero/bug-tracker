import axios from "axios";

const getTickets = async (projectId, ticketId) => {
   const response = await axios.get(`/api/ticket/${projectId}/${ticketId}`);
   return response.data;
};

const getTicket = async (projectId, ticketId) => {
   const response = await axios.get(`/api/ticket/${projectId}/${ticketId}`);
   return response.data;
};

const getProjectTickets = async (projectId) => {
   const response = await axios.get(`/api/ticket/${projectId}`);
   return response.data;
};

const createTicket = async (ticket) => {
   const response = await axios.post(`/api/ticket/${ticket.project}`, ticket);
   return response.data;
};

const updateTicket = async (projectId, ticketId, ticket) => {
   const response = await axios.put(
      `/api/ticket/${projectId}/${ticketId}`,
      ticket
   );
   return response.data;
};

const deleteTicket = async (id) => {
   const response = await axios.delete(`/api/ticket/${id}`);
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
