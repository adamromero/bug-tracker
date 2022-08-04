import React from "react";

const LoginLanding = () => {
   return (
      <div className="flex flex-col md:p-0 flex-1 p-5 items-center justify-end md:justify-center bg-[#087e8b] text-white text-center gap-2">
         <h1 className="oswald-heading font-bold text-3xl md:text-4xl">
            Welcome to Bug Tracker
         </h1>
         <p className="text-center max-w-xl mx-5 text-lg md:text-xl">
            A simple bug tracker app that allows you to create, update, and
            delete bugs and features.
         </p>
      </div>
   );
};

export default LoginLanding;
