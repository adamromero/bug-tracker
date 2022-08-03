import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";

import { PrimaryButton } from "../styles/Button";

import LoginLanding from "../components/LoginLanding";

const Login = () => {
   const initialState = {
      email: "",
      password: "",
   };
   const [credentials, setCredentials] = useState(initialState);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const { user, isLoading, isSuccess, isError, message } = useSelector(
      (state) => state.auth
   );

   const handleChange = (e) => {
      setCredentials({
         ...credentials,
         [e.target.name]: e.target.value,
      });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(login(credentials));
   };

   useEffect(() => {
      if (isSuccess || user) {
         navigate("/");
      }

      console.log("isError: ", isError);

      if (isError) {
         console.log(message);
      }
   }, [user, isSuccess, navigate]);

   return (
      <>
         <LoginLanding />
         <div className="flex flex-col flex-1 gap-3 justify-center items-center">
            <h2 className="text-lg">Login</h2>
            <form
               className="flex flex-col gap-3 max-w-xs w-full"
               onSubmit={handleSubmit}
            >
               <input
                  className="border-[1px] border-black px-2 py-1"
                  type="text"
                  name="email"
                  placeholder="Email"
                  maxLength={100}
                  onChange={handleChange}
               />

               <input
                  className="border-[1px] border-black px-2 py-1"
                  type="password"
                  name="password"
                  placeholder="Password"
                  maxLength={20}
                  onChange={handleChange}
               />

               <PrimaryButton type="submit">Login</PrimaryButton>
            </form>
            <Link className="text-lg" to="/register">
               Register
            </Link>
         </div>
      </>
   );
};

export default Login;
