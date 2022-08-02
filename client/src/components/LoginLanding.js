import React from "react";

const LoginLanding = () => {
   return (
      <div className="md:flex md:p-0 md:flex-1 flex-0 p-5 flex-col items-center justify-center bg-[#087e8b] text-white text-center text-xl gap-2">
         <h1 className="font-bold text-2xl">Welcome to Bug Tracker</h1>
         <p className="text-center mx-5">
            A simple bug tracker app that allows you to create, update, and
            delete bugs and features.
         </p>
      </div>
   );
};

export default LoginLanding;
