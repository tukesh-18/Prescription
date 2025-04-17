import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios"

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [DocInfo, SetDocInfo] = useState(null);
  const [DocSlot, SetDocSlot] = useState([]);
  const [SlotIndex, SetSlotIndex] = useState(0);
  const [slotTime, SetSlotTime] = useState('');

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const navigate = useNavigate();
  const GetAvailableSlots = async () => {
    SetDocSlot([])

    let today = new Date();
    let startDayIndex = 0;
    const now = new Date();

    // ✅ Skip today's slots if time is after 8:00 PM
    if (now.getHours() >= 20) {
      startDayIndex = 1;
    }

    for (let i = startDayIndex; i < startDayIndex + 7; i++) {

      //Getting Date with index
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      //Setting End time with index 
      let endtime = new Date();
      endtime.setDate(today.getDate() + i)
      endtime.setHours(21, 0, 0, 0)

      //setting hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      } else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      let timeslot = []
      while (currentDate < endtime) {
        let FormatedTime = currentDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = day + "_" + month + "_" + year;
        const slotTime = FormatedTime

        const isSlotAvailable = DocInfo && DocInfo.slots_booked[slotDate] && DocInfo.slots_booked[slotDate].includes(slotTime) ? false : true

        if (isSlotAvailable) {
          //Add slots to array
          timeslot.push({
            datetime: new Date(currentDate),
            time: FormatedTime
          })
        }

        //Increment current time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }
      SetDocSlot((prev => ([...prev, timeslot])))
    }
  }


  const fetchDocInfo = async () => {

    const docInfo = doctors.find(doc => doc._id === docId)
    SetDocInfo(docInfo);

  }

  const bookAppointment = async () => {
    if (!token) {
      toast.warn('login to book appointment')
      return navigate('/login')
    }

    try {
      const date = DocSlot[SlotIndex][0].datetime
      const formattedDate = date.toISOString();

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = day + "_" + month + "_" + year

      const { data } = await axios.post(backendUrl + '/api/user/book-appointment', { docId, slotDate, slotTime, date: formattedDate }, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })

      if (data.success) {
        toast.success(data.message)
        getDoctorsData()
        navigate('/myappointment')
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.error(error)
      // toast.error(error.message)
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message)
      }
    }

  }

  useEffect(() => {
    if (doctors && doctors.length > 0) {
      fetchDocInfo();
    }
  }, [doctors, docId])

  useEffect(() => {
    GetAvailableSlots();
  }, [DocInfo])


  return DocInfo && (
    <div>
      {/* ----------- Doctor Details ----------- */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div>
          <img className="bg-blue-500 w-full sm:max-w-72 rounded-lg" src={DocInfo.image} alt='' />
        </div>

        {/* Doctor Info */}
        <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
          <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
            {DocInfo.name}
            <img className="w-4" src={assets.verified_icon} alt="" />
          </p>
          <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
            <p>{DocInfo.degree} - {DocInfo.speciality}</p>
            <button className="py-0.5 px-2 border text-xs rounded-full">{DocInfo.experience}</button>
          </div>
          {/* About Doctor */}
          <div>
            <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3"> About <img src={assets.info_icon} alt="" /></p>
            <p className="text-sm text-gray-500 max-w-[700px] mt-1">{DocInfo.about}</p>
          </div>
          <div>
            <p className="text-gray-500 mt-4 font-medium">
              Appointment fee: <span className="text-gray-600">{currencySymbol}{DocInfo.fees}</span>
            </p>
          </div>
        </div>
      </div>

      {/* ----------- Booking Slots (Moved Below) ----------- */}
      <div className="sm:pl-4 sm:ml-72 mt-4 font-medium text-gray-700">
        <p>Booking Slots</p>
        <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
          {
            DocSlot.length > 0 &&
            DocSlot.map((daySlots, index) => (
              <div onClick={() => { SetSlotIndex(index); SetSlotTime(''); }}
                className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${SlotIndex === index ? `bg-blue-500 text-white` : `border border-gray-200`}`}
                key={index}
              >
                <p>{daySlots.length > 0 && daysOfWeek[daySlots[0].datetime.getDay()]}</p>
                <p>{daySlots.length > 0 && daySlots[0].datetime.getDate()}</p>
              </div>
            ))
          }
        </div>
        <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
          {
            DocSlot.length && DocSlot[SlotIndex].map((item, index) => (
              <p className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer 
                          ${item.time === slotTime ? `bg-blue-500 text-white` : `text-gray-400 border bprder-gray-300`}`} key={index}
                onClick={() => SetSlotTime(item.time)}
              >
                {
                  item.time.toLowerCase()
                }
              </p>
            ))
          }
        </div>
        <button onClick={bookAppointment} className="bg-blue-500 text-white text-sm font-light px-14 py-3 rounded-full my-6 cursor-pointer">Book an Appointment</button>
      </div>
      {/* ----------Listing Related Documents ---------> */}
      <RelatedDoctors docId={docId} speciality={DocInfo.speciality} />

    </div>
  )
}

export default Appointment
