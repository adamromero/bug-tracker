import { useState, useContext, useEffect } from "react";
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
import { TbRadar2 } from "react-icons/tb";

import { ThemeContext } from "../contexts/ThemeContext";

import { getUser } from "../features/users/allUsersSlice";

const Navigation = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const location = useLocation();
   const theme = useContext(ThemeContext);
   const darkMode = theme.state.darkMode;

   const { user } = useSelector((state) => state.auth);
   const { currentUser } = useSelector((state) => state.users);
   const [userImage, setUserImage] = useState("");

   const handleLogout = () => {
      dispatch(logout());
      dispatch(reset());
      navigate("/");
   };

   useEffect(() => {
      if (user) {
         dispatch(getUser(user._id));
         setUserImage(
            user.image
               ? `/uploads/${user.image}`
               : "data:image/png;base64,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"
         );
      }
   }, [dispatch, user ? user._id : null]);

   if (user && location.pathname !== "/404") {
      return (
         <nav className="md:min-h-screen md:max-w-[275px] bg-zinc-300 w-full p-5 dark:bg-zinc-900 text-[#087e8b] dark:text-white">
            <div className="flex justify-between items-center mb-2">
               <Link className="flex items-center gap-1" to="/">
                  <h1 className="oswald-heading font-bold text-3xl ">
                     Bug Tracker
                  </h1>
                  <TbRadar2 className="animate-spin text-xl" />
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
               <Link className="flex items-center gap-2" to="/profile">
                  <img
                     className="border-[1px] border-black rounded-full"
                     src={userImage}
                     width="35"
                     alt={user.name}
                  />
                  {user.name}
               </Link>
            </h2>
            {user.name === "demo" && (
               <p className="bg-white text-black text-xs p-2 mt-2">
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
