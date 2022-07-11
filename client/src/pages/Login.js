import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";

import { PrimaryButton } from "../styles/Button";
import LoginBoxStyle from "../styles/LoginBoxStyle";

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
   }, [user, isSuccess, navigate]);

   return (
      <LoginBoxStyle>
         <div className="landing-panel">
            <h1>Welcome to Bug Tracker</h1>
            <p>
               This is a simple bug tracker app that allows you to create,
               update, and delete bugs.
            </p>
         </div>
         <div className="login">
            <div>
               <h1>Login</h1>
               <form onSubmit={handleSubmit}>
                  <input
                     type="text"
                     name="email"
                     placeholder="Email"
                     onChange={handleChange}
                  />

                  <input
                     type="password"
                     name="password"
                     placeholder="Password"
                     onChange={handleChange}
                  />

                  <PrimaryButton type="submit">Login</PrimaryButton>
               </form>
               <Link to="/register">Register</Link>
            </div>
         </div>
      </LoginBoxStyle>
   );
};

export default Login;
