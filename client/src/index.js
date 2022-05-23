import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { store } from "./app/store";
import { Provider } from "react-redux";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Ticket from "./pages/Ticket";
import Project from "./pages/Project";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   <React.StrictMode>
      <Provider store={store}>
         <Router>
            <header>
               <nav>
                  <Link to="/">
                     <h1>Bug Tracker</h1>
                  </Link>
               </nav>
            </header>
            <Routes>
               <Route exact path="/" element={<Dashboard />} />
               <Route path="/login" element={<Login />} />
               <Route path="/register" element={<Register />} />
               <Route path="/ticket" element={<Ticket />} />
               <Route path="/project/:id" element={<Project />} />
            </Routes>
         </Router>
      </Provider>
   </React.StrictMode>
);
