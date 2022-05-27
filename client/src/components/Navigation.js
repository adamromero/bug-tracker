import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

const Navigation = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { user } = useSelector((state) => state.auth);

   const handleLogout = () => {
      dispatch(logout());
      dispatch(reset());
      navigate("/");
   };

   if (user) {
      return (
         <nav>
            <Link to="/">
               <h1>Bug Tracker</h1>
            </Link>

            <h2>{user.name}</h2>
            <ul>
               <li>
                  <Link to="/">Dashboard</Link>
               </li>
               <li>
                  <Link to="/tickets">Tickets</Link>
               </li>
               <li>
                  <Link to="/administration">Administration</Link>
               </li>
            </ul>
            <button onClick={handleLogout}>Logout</button>
         </nav>
      );
   } else {
      return null;
   }
};

export default Navigation;
