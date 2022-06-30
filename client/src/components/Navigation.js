import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

import NavigationStyle from "../styles/NavigationStyle";
import { PrimaryButton } from "../styles/Button";

const Navigation = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const location = useLocation();

   const { user } = useSelector((state) => state.auth);

   const handleLogout = () => {
      dispatch(logout());
      dispatch(reset());
      navigate("/");
   };

   if (user) {
      return (
         <NavigationStyle>
            <Link to="/">
               <h1>Bug Tracker</h1>
            </Link>

            <h2>{user.name}</h2>
            <ul>
               <li
                  style={{
                     fontWeight: location.pathname === "/" ? "bold" : "",
                  }}
               >
                  <Link to="/">Dashboard</Link>
               </li>
               <li
                  style={{
                     fontWeight: location.pathname === "/tickets" ? "bold" : "",
                  }}
               >
                  <Link to="/tickets">Tickets</Link>
               </li>
               <li
                  style={{
                     fontWeight:
                        location.pathname === "/administration" ? "bold" : "",
                  }}
               >
                  <Link to="/administration">Administration</Link>
               </li>
            </ul>
            <PrimaryButton onClick={handleLogout}>Logout</PrimaryButton>
         </NavigationStyle>
      );
   } else {
      return null;
   }
};

export default Navigation;
