import { useSelector } from "react-redux";

export function useUserValidation() {
   const { user } = useSelector((state) => state.auth);
   return user.name !== "demo" && user.isVerified;
}

export const userValidationMessage = (isUserAuthorized) => {
   if (!isUserAuthorized) {
      return (
         <p className="text-red-600">You are not authorized make this change</p>
      );
   }
   return null;
};
