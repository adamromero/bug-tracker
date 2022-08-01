import React from "react";

const LoginLanding = () => {
   return (
      <div className="md:flex flex-col items-center justify-center flex-1 bg-[#087e8b] text-white text-xl gap-2 hidden">
         <h1 className="font-bold text-2xl">Welcome to Bug Tracker</h1>
         <p className="text-center mx-5">
            A simple bug tracker app that allows you to create, update, and
            delete bugs and features.
         </p>
      </div>
   );
};

export default LoginLanding;
