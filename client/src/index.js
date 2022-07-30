import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { store } from "./app/store";
import { Provider } from "react-redux";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Tickets from "./pages/Tickets";
import Ticket from "./pages/Ticket";
import Administration from "./pages/Administration";
import Project from "./pages/Project";
import Navigation from "./components/Navigation";
import Profile from "./pages/Profile";
import { GlobalStyle } from "./styles/utils";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   <React.StrictMode>
      <Provider store={store}>
         <Router>
            <div className="flex">
               <Navigation />
               <main className="flex-1 dark:bg-zinc-800 dark:text-white">
                  <Routes>
                     <Route exact path="/" element={<Dashboard />} />
                     <Route path="/login" element={<Login />} />
                     <Route path="/profile" element={<Profile />} />
                     <Route path="/register" element={<Register />} />
                     <Route path="/tickets" element={<Tickets />} />
                     <Route path="/ticket/:id" element={<Ticket />} />
                     <Route path="/project/:id" element={<Project />} />
                     <Route
                        path="/administration"
                        element={<Administration />}
                     />
                  </Routes>
               </main>
            </div>
         </Router>
      </Provider>
   </React.StrictMode>
);
