import { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

import { PrimaryButton } from "../styles/Button";

import { MdDashboard } from "react-icons/md";
import { FaTicketAlt } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";

import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { TbRadar } from "react-icons/tb";

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
         <nav className="md:min-h-screen md:max-w-[275px] bg-zinc-300 w-full p-5 dark:bg-zinc-900 text-[#087e8b] dark:text-[#73e9ff]">
            <div className="flex justify-between items-center mb-2">
               <Link className="flex items-center gap-1" to="/">
                  <h1 className="font-bold text-3xl ">Bug Tracker</h1>
                  <TbRadar className="animate-spin	relative	top-1" />
               </Link>
               {darkMode ? (
                  <button
                     onClick={() => {
                        theme.dispatch({ type: "TOGGLE_THEME" });
                     }}
                  >
                     <MdLightMode
                        className="text-2xl text-[#087e8b] rounded p-1 bg-white cursor-pointer"
                        title="Light Mode"
                     />
                  </button>
               ) : (
                  <button
                     onClick={() => {
                        theme.dispatch({ type: "TOGGLE_THEME" });
                     }}
                  >
                     <MdDarkMode
                        className="text-2xl text-white rounded p-1 bg-[#087e8b] cursor-pointer"
                        title="Dark Mode"
                     />
                  </button>
               )}
            </div>
            <h2 className="font-bold text-lg">
               <Link to="/profile">{user.name}</Link>
            </h2>
            {user.name === "demo" && (
               <p className="bg-white text-black text-xs p-2">
                  This is an account meant for demo purposes. No data will be
                  altered when using this account.
               </p>
            )}
            <ul className="py-2 mt-2 mb-4 border-y-[1px] border-gray-600">
               <li
                  className="pb-2"
                  style={{
                     fontWeight: location.pathname === "/" ? "bold" : "",
                  }}
               >
                  <Link className="inline-flex items-center" to="/">
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
                  <Link className="inline-flex items-center" to="/tickets">
                     <FaTicketAlt style={{ marginRight: "8px" }} />
                     Tickets
                  </Link>
               </li>
               <li
                  className="pb-2"
                  style={{
                     fontWeight: location.pathname === "/profile" ? "bold" : "",
                  }}
               >
                  <Link className="inline-flex items-center" to="/profile">
                     <CgProfile style={{ marginRight: "8px" }} />
                     Profile
                  </Link>
               </li>
               {user.isAdmin && (
                  <li
                     style={{
                        fontWeight:
                           location.pathname === "/administration"
                              ? "bold"
                              : "",
                     }}
                  >
                     <Link
                        className="inline-flex items-center"
                        to="/administration"
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
