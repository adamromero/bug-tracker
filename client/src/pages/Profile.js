import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updatePassword } from "../features/auth/authSlice";
import Spinner from "../styles/Spinner";
import { uploadImage } from "../features/images/imageSlice";
import { getUser, updateUser } from "../features/users/allUsersSlice";

import {
   useUserValidation,
   userValidationMessage,
} from "../utils/userValidation";

const Profile = () => {
   const { user, isLoading } = useSelector((state) => state.auth);
   const { currentUser } = useSelector((state) => state.users);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [selectedImage, setSelectedImage] = useState(null);
   const [imageTitle, setImageTitle] = useState("");
   const [imageUrl, setImageUrl] = useState(
      "data:image/png;base64,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"
   );
   const [passwords, setPasswords] = useState({});
   const isUserAuthorized = useUserValidation();
   const formData = new FormData();

   useEffect(() => {
      if (!user) {
         navigate("/login");
      } else {
         dispatch(getUser(user._id));
         if (user.image) {
            setImageUrl(`/uploads/${user.image}`);
         }
      }
   }, [user.name]);

   const handleImageUpload = (e) => {
      setImageUrl(URL.createObjectURL(e.target.files[0]));
      setSelectedImage(e.target.files[0]);
      setImageTitle(`${new Date().getTime()}_${e.target.files[0].name}`);
   };

   const handleImageSubmit = (e) => {
      e.preventDefault();
      formData.append("image", selectedImage, imageTitle);

      const newUserImage = {
         ...user,
         image: imageTitle,
      };

      if (isUserAuthorized) {
         dispatch(uploadImage(formData));
         dispatch(updateUser(newUserImage));
      }
   };

   const handleNewPasswordSubmit = (e) => {
      e.preventDefault();

      if (isUserAuthorized) {
         dispatch(updatePassword(passwords));
      }
   };

   const handlePasswordChange = (e) => {
      setPasswords({
         ...passwords,
         id: user._id,
         [e.target.name]: e.target.value,
      });
   };

   if (isLoading) {
      return <Spinner />;
   }

   if (user) {
      return (
         <div className="m-5">
            <h2 className="text-2xl	font-bold pb-5 mb-5 border-b-[1px] border-slate-200">
               Profile
            </h2>
            <div className="my-5 md:text-xl text-lg">
               <p>
                  {user.name} {user.isAdmin && "(Administrator)"}
               </p>
               <p>{user.email}</p>
            </div>
            <div>{userValidationMessage(isUserAuthorized)}</div>
            <div className="flex md:gap-20 gap-5 md:flex-row flex-col">
               <div>
                  <h3 className="font-bold mb-2">Upload Profile Image</h3>
                  <div className="flex flex-col max-w-[14rem] gap-3 mb-5">
                     <img src={imageUrl} width="100" alt={user.name} />

                     <form
                        onSubmit={handleImageSubmit}
                        encType="multipart/form-data"
                     >
                        <input
                           className="mb-3 w-[217px]"
                           id="image"
                           type="file"
                           name="image"
                           accept="image/*"
                           onChange={handleImageUpload}
                        />
                        <button
                           className="bg-[#087e8b] text-white max-w-[6rem] w-full"
                           type="submit"
                           disabled={!selectedImage || !isUserAuthorized}
                        >
                           Upload
                        </button>
                     </form>
                  </div>
               </div>
               <div>
                  <h3 className="font-bold mb-2">Update Password</h3>
                  <form
                     className="inline-flex flex-col gap-3"
                     onSubmit={handleNewPasswordSubmit}
                  >
                     <input
                        className="border-[1px] border-slate-200 p-1"
                        type="password"
                        name="currentPassword"
                        placeholder="Current password"
                        maxLength="20"
                        onChange={handlePasswordChange}
                     />
                     <input
                        className="border-[1px] border-slate-200 p-1"
                        type="password"
                        name="newPassword"
                        placeholder="New password"
                        maxLength="20"
                        onChange={handlePasswordChange}
                     />
                     <input
                        className="border-[1px] border-slate-200 p-1"
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm password"
                        maxLength="20"
                        onChange={handlePasswordChange}
                     />
                     <button
                        className="bg-[#087e8b] text-white max-w-[6rem] w-full"
                        disabled={!isUserAuthorized}
                     >
                        Update
                     </button>
                  </form>
               </div>
            </div>
         </div>
      );
   } else {
      return null;
   }
};

export default Profile;
