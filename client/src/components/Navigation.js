import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

import NavigationStyle from "../styles/NavigationStyle";
import { PrimaryButton } from "../styles/Button";

import { MdDashboard } from "react-icons/md";
import { FaTicketAlt } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";

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
         <nav className="min-h-screen	bg-slate-200 max-w-[275px]	w-full p-5	">
            <Link to="/">
               <h1 className="font-bold text-3xl mb-2">Bug Tracker</h1>
            </Link>
            <h2>
               <Link to="/profile">{user.name}</Link>
            </h2>
            <ul className="py-5">
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
