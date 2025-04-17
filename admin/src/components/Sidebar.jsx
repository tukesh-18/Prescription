import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets/assets'
import { DoctorContext } from '../context/DoctorContext'

const Sidebar = () => {

    const {aToken} = useContext(AdminContext)
    const {dToken} = useContext(DoctorContext)

  return (
    <div className='min-h-screen bg-whilte border-r'>
      {
        aToken && <ul className='text-[#515151] mt-5'>
  
       {/* SideBar for the Admin Panel Contains Dashboard Appointment Add Doctor and Doctor List */}

         <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? `bg-[#F3F3FF] border-r-4 border -[#5F6FFF]` : ``} `} to={'/admin-dashboard'}>
            <img src={assets.home_icon} alt='' />
            <p className='hidden md:block'>Dashboard</p>
         </NavLink>

         <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? `bg-[#F3F3FF] border-r-4 border -[#5F6FFF]` : ``} `} to={'/all-appointments'}>
            <img src={assets.appointment_icon} alt='' />
            <p className='hidden md:block'>Appointments</p>
         </NavLink>

         <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? `bg-[#F3F3FF] border-r-4 border -[#5F6FFF]` : ``} `} to={'/add-doctor'}>
            <img src={assets.add_icon} alt='' />
            <p className='hidden md:block'>Add Doctor</p>
         </NavLink>

         <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? `bg-[#F3F3FF] border-r-4 border -[#5F6FFF]` : ``} `} to={'/doctor-list'}>
            <img src={assets.people_icon} alt='' />
            <p className='hidden md:block'>Doctor List</p>
         </NavLink>

        </ul>
      }
       {
        dToken && <ul className='text-[#515151] mt-5'>
   
        {/* SideBar for the Doctor LOgin DashBoard Appointment and Profile */}

         <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? `bg-[#F3F3FF] border-r-4 border -[#5F6FFF]` : ``} `} to={'/doctor-dashboard'}>
            <img src={assets.home_icon} alt='' />
            <p className='hidden md:block'>Dashboard</p>
         </NavLink>

         <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? `bg-[#F3F3FF] border-r-4 border -[#5F6FFF]` : ``} `} to={'/doctor-appointment'}>
            <img src={assets.appointment_icon} alt='' />
            <p className='hidden md:block'>Appointments</p>
         </NavLink>

         <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? `bg-[#F3F3FF] border-r-4 border -[#5F6FFF]` : ``} `} to={'/doctor-profile'}>
            <img src={assets.people_icon} alt='' />
            <p className='hidden md:block'>Profile</p>
         </NavLink>

        </ul>
      }
    </div>
  )
}

export default Sidebar
