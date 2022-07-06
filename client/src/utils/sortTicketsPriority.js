const priorityOrder = ["High", "Medium", "Low"];

const sortTicketsByPriorityAscending = (tickets) => {
   const sortedTickets = [...tickets];
   return sortedTickets.sort((a, b) => {
      return (
         priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority)
      );
   });
};

const sortTicketsByPriorityDescending = (tickets) => {
   const sortedTickets = [...tickets];
   return sortedTickets.sort((a, b) => {
      return (
         priorityOrder.indexOf(b.priority) - priorityOrder.indexOf(a.priority)
      );
   });
};

export { sortTicketsByPriorityAscending, sortTicketsByPriorityDescending };
