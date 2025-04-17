import { createContext, useEffect, useState } from "react";
// import { doctors } from "../assets/assets";
import axios from "axios"
import { toast } from "react-toastify"
export const AppContext = createContext();

const AppContextProvider = (props) => {

   const currencySymbol = '$'
   const backendUrl = import.meta.env.VITE_BACKEND_URL
   const [doctors, SetDoctors] = useState([]);
   const [token, SetToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false)
   const [userData, SetUserData] = useState(false)


   const getDoctorsData = async () => {
      try {
         const { data } = await axios.get(backendUrl + '/api/doctor/list')
         if (data.success) {
            SetDoctors(data.doctors)
         } else {
            toast.error(data.message)
         }
      } catch (error) {
         console.error(error)
         toast.error(error.message)
      }
   }

   const loadUserProfileData = async () => {
      try {

         const { data } = await axios.get(backendUrl + '/api/user/get-profile', {
            headers: {
               "Authorization": `Bearer ${token}`
            }
         })
         // console.log("Token at loadUserProfileData:", token);


         if (data.success) {
            SetUserData(data.userData)
         } else {
            // Handle unauthorized access
            if (data.message === "Not authorised to login again") {
               // Clear token from localStorage
               localStorage.removeItem('token')
               // Reset token state
               SetToken(false)
               // Clear user data
               SetUserData(false)
               toast.error("Session expired. Please login again")
            } else {
               toast.error(data.message)
            }
         }

      } catch (error) {
         console.error("Profile Load Error:", error.response?.data || error)
         // Handle 401 Unauthorized errors
         if (error.response?.status === 401) {
            localStorage.removeItem('token')
            SetToken(false)
            SetUserData(false)
            toast.error("Session expired. Please login again")
         } else {
            toast.error(error.response?.data?.message || "Failed to load profile")
         }
      }
   }

   const UpdateProfileData = async () => {
      try {
         const formData = new FormData();
         formData.append("userId", userData._id);
         formData.append("name", userData.name);
         formData.append("phone", userData.phone);
         formData.append("dob", userData.dob);
         formData.append("gender", userData.gender);
         formData.append("address", JSON.stringify({
            line1: userData.address.line1,
            line2: userData.address.line2
         }));

         if (userData.imageFile) {
            formData.append("image", userData.imageFile);
         }

         const { data } = await axios.post(
            backendUrl + "/api/user/update-profile",
            formData,
            {
               headers: {
                  "Authorization": `Bearer ${token}`,
                  "Content-Type": "multipart/form-data"
               }
            }
         );

         if (data.success) {
            toast.success(data.message);
            console.log(data);
         } else {
            toast.error(data.message);
         }
      } catch (error) {
         console.error(error);
         toast.error("Something went wrong while updating the profile.");
      }
   };


   const value = {
      doctors, getDoctorsData, currencySymbol, token, SetToken, backendUrl, userData,
      SetUserData, loadUserProfileData, UpdateProfileData
   }

   useEffect(() => {
      getDoctorsData();
   }, [])

   useEffect(() => {
      if (token) {
         loadUserProfileData();
      } else {
         SetUserData(false)
      }
   }, [token])



   return (
      <AppContext.Provider value={value}>
         {props.children}
      </AppContext.Provider>
   )

}

export default AppContextProvider