import { createContext, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"


export const AdminContext = createContext();

const AdminContextProvider = (props) => {

    //  Setting Admin Token in Local Storage If page is refreshed it still lets keep admin as logged in

    const [aToken, SetAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : "")
    const [doctors, SetDoctors] = useState([])
    const [appointments, SetAppointments] = useState([]);
    const [dashData, SetdashData] = useState(false)

    // Fetching the Backend Urpl(url before endpoints from .env file)
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    //    This is the function for Getting All the doctors for Admin in Admin login

    const getAllDoctors = async () => {
        try {
            const { data } = await axios.post(backendUrl + `/api/admin/all-doctors`, {}, { headers: { aToken } })

            if (data.success) {
                SetDoctors(data.doctors)
                console.log(data.doctors)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.error(error)
        }
    }

    // This is the Function to Chnage the Doctor availability as Available or not available by changing in APi
    //  in APi make changes as isAvailable as true or false accordingly 

    const ChangeAvailability = async (docId) => {
        try {

            const { data } = await axios.post(backendUrl + `/api/admin/change-availability`, { docId }, { headers: { aToken } })
            if (data.success) {
                toast.success(data.message)
                getAllDoctors();
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    //  This function gets all the appointments of all the doctors from the database for the admin

    const getAllAppointments = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/admin/appointments', { headers: { aToken } })
            console.log(data)
            if (data.success) {
                SetAppointments(data.appointments)
                console.log(data.appointments)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.error(error)
            toast.error(error.message)
        }
    }

//   In this Project Admin can also cancel the Appointment by using this function

    const cancelAppointment = async (appointmentId) => {
        try {

            const { data } = await axios.post(backendUrl + '/api/admin/cancel-appointment', { appointmentId }, { headers: { aToken } })

            if (data.success) {
                toast.success(data.message)
                getAllAppointments();
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.error(error)
            toast.error(error.message)
        }
    }

//   This function is used to show all the dashData in Admin Login

    const getDashData = async () => {
        try {
            const { data } = await axios.get(backendUrl + "/api/admin/dashboard", { headers: { aToken } })

            if (data.success) {
                SetdashData(data.dashData)
                console.log(data.dashData);

            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.error(error)
            toast.error(error.message)
        }
    }

    // These are the Functions and UseState values we are stored in Context file so that wherevere they are required 
    // we can fetch it and use it

    const value = {
        // your context values will go here
        aToken,
        SetAToken,
        backendUrl,
        doctors,
        getAllDoctors,
        ChangeAvailability,
        appointments,
        SetAppointments,
        getAllAppointments,
        cancelAppointment,
        dashData,
        getDashData
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider