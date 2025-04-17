import React, { useContext } from 'react'
import {assets} from "../assets/assets/assets"
import { AdminContext } from '../context/AdminContext'
import {useNavigate} from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'

const Navbar = () => {
 
    // Accesiing Admin and Doctor Token from the AdminContext and DoctorContext

    const {aToken, SetAToken} = useContext(AdminContext)
    const {dToken,SetDToken} = useContext(DoctorContext)

     const navigate = useNavigate()

    //  Function For the Logout
    const Logout = () => {
        navigate('/')
        aToken && SetAToken('')
        aToken && localStorage.removeItem('aToken')
        dToken && SetDToken('')
        dToken && localStorage.removeItem('dToken')
    }

return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
        <div className='flex items-center gap-2 text-xs' >
            <img className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo} alt="Admin Logo" />
            <p className='border px-2.5 py-0.5 rounded-full border-gray-600'>{aToken ? 'Admin' : 'Doctor'}</p>
        </div>
        <button onClick={Logout} className='bg-[#5F6FFF] text-white text-sm px-10 py-2 rounded-full'>Logout</button>
    </div>
)
}

export default Navbar
