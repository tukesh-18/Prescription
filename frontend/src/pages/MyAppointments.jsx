import { useContext, useEffect, useState } from "react"
import { AppContext } from "../context/AppContext"
import axios from "axios"
import { toast } from "react-toastify"

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext)
  const [appointments, SetAppointments] = useState([])
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return dateArray[0] + " " + months[Number(dateArray[1]) - 1] + " " + dateArray[2];
  }

  const getUsersAppointments = async () => {
    try {
      console.log("Token being sent:", token)
      const { data } = await axios.post(backendUrl + '/api/user/appointment', {}, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })



      if (data.success) {
        SetAppointments(data.appointments.reverse())
        console.log(data.appointments)
      }


    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  }

  const CancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })

      if (data.success) {
        toast.success(data.message)
        getUsersAppointments();
        getDoctorsData()
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      getUsersAppointments()
    }
  }, [token])


  return (
    <div className="pb-3 mt-12 font-medium text-zinc-700 border-b">
      <p>My Appointments</p>
      <div>
        {
          appointments.map((item, index) => (
            <div className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b" key={index}>
              <div>
                <img className="bg-indigo-50 w-32" src={item.docData.image} alt="" />
              </div>
              <div className="flex-1 text-sm text-zinc-600">
                <p className="text-neutral-800 font-semibold">{item.docData.name}</p>
                <p>{item.docData.speciality}</p>
                <p className="text-zinc-700 font-medium mt-1">Address:</p>
                <p className="text-xs">{item.docData.address.line1}</p>
                <p className="text-xs">{item.docData.address.line2}</p>
                <p className="text-xs mt-1"><span className="text-sm text-neutral-700 font-medium">Date and Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime} </p>
              </div>
              <div></div>
              <div className="flex flex-col gap-2 justify-end">
                {!item.cancelled && !item.isCompleted && <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-blue-600 hover:text-white transition duration-300">Pay Online</button>}
                {!item.cancelled && !item.isCompleted && <button onClick={() => CancelAppointment(item._id)} className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition duration-300">Cancel Appointment</button>}
                {item.cancelled && <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500">Appointment Cancelled</button>}
                {item.isCompleted && <button className="sm:min-w-48 py-2 border border-green-500 rounded text-green-500">Completed</button>}
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default MyAppointments
