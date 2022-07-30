import { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

import { PrimaryButton } from "../styles/Button";

import { MdDashboard } from "react-icons/md";
import { FaTicketAlt } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";

import { ThemeContext } from "../contexts/ThemeContext";

const Navigation = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const location = useLocation();
   const theme = useContext(ThemeContext);
   const darkMode = theme.state.darkMode;

   const { user } = useSelector((state) => state.auth);

   const handleLogout = () => {
      dispatch(logout());
      dispatch(reset());
      navigate("/");
   };

   if (user) {
      return (
         <nav className="min-h-screen bg-zinc-300 max-w-[275px] w-full p-5 dark:bg-zinc-900">
            <div className="flex justify-between	 items-center mb-2">
               <Link to="/">
                  <h1 className="font-bold text-3xl ">Bug Tracker</h1>
               </Link>
               {darkMode ? (
                  <MdLightMode
                     className="text-2xl text-[#087e8b] rounded p-1 bg-white cursor-pointer"
                     title="Light Mode"
                     onClick={() => {
                        theme.dispatch({ type: "TOGGLE_THEME" });
                     }}
                  />
               ) : (
                  <MdDarkMode
                     className="text-2xl text-white rounded p-1 bg-[#087e8b] cursor-pointer"
                     title="Dark Mode"
                     onClick={() => {
                        theme.dispatch({ type: "TOGGLE_THEME" });
                     }}
                  />
               )}
            </div>

            <h2 className="font-bold text-xl">
               <Link to="/profile">{user.name}</Link>
            </h2>
            <ul className="py-2 mt-2 mb-4 border-y-[1px] border-gray-600">
               <li
                  className="pb-2"
                  style={{
                     fontWeight: location.pathname === "/" ? "bold" : "",
                  }}
               >
                  <Link
                     to="/"
                     style={{ display: "flex", alignItems: "center" }}
                  >
                     <MdDashboard style={{ marginRight: "8px" }} />
                     Dashboard
                  </Link>
               </li>
               <li
                  className="pb-2"
                  style={{
                     fontWeight: location.pathname === "/tickets" ? "bold" : "",
                  }}
               >
                  <Link
                     to="/tickets"
                     style={{ display: "flex", alignItems: "center" }}
                  >
                     <FaTicketAlt style={{ marginRight: "8px" }} />
                     Tickets
                  </Link>
               </li>
               {user.isAdmin && (
                  <li
                     className="pb-2"
                     style={{
                        fontWeight:
                           location.pathname === "/administration"
                              ? "bold"
                              : "",
                     }}
                  >
                     <Link
                        to="/administration"
                        style={{ display: "flex", alignItems: "center" }}
                     >
                        <RiAdminFill style={{ marginRight: "8px" }} />
                        Administration
                     </Link>
                  </li>
               )}
            </ul>
            <PrimaryButton onClick={handleLogout}>Logout</PrimaryButton>
         </nav>
      );
   } else {
      return null;
   }
};

export default Navigation;
