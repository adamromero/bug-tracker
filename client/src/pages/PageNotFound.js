import React from "react";
import { AiFillWarning } from "react-icons/ai";

const PageNotFound = () => {
   return (
      <div className="flex flex-1 justify-center items-center min-h-screen">
         <h1 className="flex text-xl md:text-3xl gap-2">
            <AiFillWarning className="text-red-500" /> 404 Page Not Found
         </h1>
      </div>
   );
};

export default PageNotFound;
