const statusOrder = ["In Progress", "On Hold", "Completed"];

const sortTicketsByStatusAscending = (tickets) => {
   const sortedTickets = [...tickets];
   return sortedTickets.sort((a, b) => {
      return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
   });
};

const sortTicketsByStatusDescending = (tickets) => {
   const sortedTickets = [...tickets];
   return sortedTickets.sort((a, b) => {
      return statusOrder.indexOf(b.status) - statusOrder.indexOf(a.status);
   });
};

export { sortTicketsByStatusAscending, sortTicketsByStatusDescending };
