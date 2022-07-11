import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../features/auth/authSlice";

import { PrimaryButton } from "../styles/Button";
import LoginBoxStyle from "../styles/LoginBoxStyle";

const Register = () => {
   const initialState = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
   };
   const [credentials, setCredentials] = useState(initialState);

   const { name, email, password, confirmPassword } = credentials;

   const dispatch = useDispatch();
   const navigate = useNavigate();

   const { user, isSuccess, isError, message } = useSelector(
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
      if (password === confirmPassword) {
         const userData = {
            name,
            email,
            password,
         };

         dispatch(register(userData));
      }
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
               <h1>Register</h1>
               <form onSubmit={handleSubmit}>
                  <input
                     type="text"
                     name="name"
                     placeholder="Name"
                     onChange={handleChange}
                  />
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
                  <input
                     type="password"
                     name="confirmPassword"
                     placeholder="Confirm Password"
                     onChange={handleChange}
                  />
                  <PrimaryButton type="submit">Submit</PrimaryButton>
               </form>
            </div>
            <Link to="/login">Login</Link>
         </div>
      </LoginBoxStyle>
   );
};

export default Register;
