import { createContext, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"


export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {

    //  This is also context file and stores all states required for doctor login

    // THis thr url for backend fetching it from .env file
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    //  Storing the Doctor login token in local Storage So it will keep logged in after refresh of page

    const [dToken, SetDToken] = useState(localStorage.getItem('dToken') ? localStorage.getItem('dToken') : "")
    const [Appointments, SetAppointments] = useState([])
    const [dashData, SetdashData] = useState(false)
    const [profileData, setprofileData] = useState(false)

    // This is the function to fetch the Appointment for Doctor

    const getAppointments = async () => {
        try {

            const { data } = await axios.post(backendUrl + '/api/doctor/appointments', {}, { headers: { dToken } })
            if (data.success) {
                SetAppointments(data.Appointments)
                console.log(data.Appointments)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.error(error)
            toast.error(error.message)
        }
    }

    //    This is the Function to Complete the Appointment from Doctor this is only for Doctor not for Admin

    const CompleteAppointment = async (appointmentId) => {
        try {

            const { data } = await axios.post(backendUrl + '/api/doctor/complete-appointment', { appointmentId }, { headers: { dToken } })

            if (data.success) {
                toast.success(data.message);
                getAppointments();
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.error(error)
            toast.error(error.message)
        }
    }

    // This is the Function to cancel the Appoinment Doctor can cancel the Appointment

    const CancelAppointment = async (appointmentId) => {
        try {

            const { data } = await axios.post(backendUrl + '/api/doctor/cancel-appointment', { appointmentId }, { headers: { dToken } })

            if (data.success) {
                toast.success(data.message);
                getAppointments();
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.error(error)
            toast.error(error.message)
        }
    }

    // Doctor also has Dashbord this is the function to get all the data required for dashboard

    const getDashData = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/doctor/dashboard', { headers: { dToken } })
            if (data.success) {
                SetdashData(data.dashData)
                console.log(data.dashData)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.error(error)
            toast.error(error.message)
        }
    }

    // Doctor also has profile This is the function to get the Profile of doctor 

    const getProfileData = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/doctor/profile', { headers: { dToken } })
            if (data.success) {
                setprofileData(data.profileData)
                console.log(data.profileData)
            }
        } catch (error) {
            console.error(error)
            toast.error(error.message)
        }
    }

    const value = {
        // your context values will go here
        dToken, SetDToken,
        backendUrl, Appointments,
        SetAppointments, getAppointments,
        CompleteAppointment,
        CancelAppointment, dashData, SetdashData,
        getDashData, profileData, setprofileData,
        getProfileData
    }

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider