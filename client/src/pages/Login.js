import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useReducer, useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";

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
      <div>
         <h1>Login</h1>
         <form onSubmit={handleSubmit}>
            <input
               type="text"
               name="email"
               placeholder="Email"
               onChange={handleChange}
            />
            <br />
            <input
               type="password"
               name="password"
               placeholder="Password"
               onChange={handleChange}
            />
            <br />
            <button type="submit">Login</button>
         </form>
      </div>
   );
};

export default Login;
