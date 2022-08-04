import { useSelector } from "react-redux";
import { AiFillWarning } from "react-icons/ai";

export function useUserValidation() {
   const { user } = useSelector((state) => state.auth);
   if (user) {
      return user.name !== "demo" && user.isVerified;
   }
   return false;
}

export const userValidationMessage = (isUserAuthorized) => {
   if (!isUserAuthorized) {
      return (
         <p className="flex text-red-600 items-center gap-1 my-2">
            <AiFillWarning /> This account is not authorized to make changes
         </p>
      );
   }
   return null;
};
