import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import {
   BrowserRouter as Router,
   Routes,
   Route,
   Navigate,
   Link,
} from "react-router-dom";
import { store } from "./app/store";
import { Provider, useSelector } from "react-redux";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Tickets from "./pages/Tickets";
import Ticket from "./pages/Ticket";
import Administration from "./pages/Administration";
import Project from "./pages/Project";
import Navigation from "./components/Navigation";
import Profile from "./pages/Profile";
import PageNotFound from "./pages/PageNotFound";
import "./index.css";

import { ThemeProvider } from "./contexts/ThemeContext";
import { ThemeContext } from "./contexts/ThemeContext";

const App = () => {
   const theme = useContext(ThemeContext);
   const darkMode = theme.state.darkMode;

   const { user, isSuccess, isError, message } = useSelector(
      (state) => state.auth
   );

   return (
      <Router>
         <div
            className={`${
               user ? `flex flex-col md:flex-row ${darkMode ? "dark" : ""}` : ""
            }`}
         >
            <Navigation />
            <main
               className={`${
                  user
                     ? "flex-1 dark:bg-zinc-800 dark:text-white min-h-screen"
                     : "flex min-h-screen	md:flex-row flex-col"
               }`}
            >
               <Routes>
                  <Route exact path="/" element={<Dashboard />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/tickets" element={<Tickets />} />
                  <Route path="/ticket/:id" element={<Ticket />} />
                  <Route path="/project/:id" element={<Project />} />
                  <Route path="/administration" element={<Administration />} />
                  <Route path="/404" element={<PageNotFound />} />
                  <Route path="*" element={<Navigate to="/404" replace />} />
               </Routes>
            </main>
         </div>
      </Router>
   );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   <React.StrictMode>
      <ThemeProvider>
         <Provider store={store}>
            <App />
         </Provider>
      </ThemeProvider>
   </React.StrictMode>
);
