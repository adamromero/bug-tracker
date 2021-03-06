import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import projectReducer from "../features/projects/projectSlice";
import userReducer from "../features/users/allUsersSlice";
import ticketReducer from "../features/tickets/ticketSlice";
import commentReducer from "../features/comments/commentSlice";

export const store = configureStore({
   reducer: {
      auth: authReducer,
      projects: projectReducer,
      users: userReducer,
      tickets: ticketReducer,
      comments: commentReducer,
   },
});
