import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext'
// import {assets} from "../assets/assets_admin/assets"
import axios from 'axios'
import { toast } from 'react-toastify'
import { DoctorContext } from '../context/DoctorContext'

const Login = () => {


  const [state, SetState] = useState('Admin')
  const [email, SetEmail] = useState('')
  const [password, SetPassword] = useState('')
  const { SetAToken, backendUrl } = useContext(AdminContext)
  const { SetDToken } = useContext(DoctorContext)

  const onsubmitHandler = async (e) => {
    e.preventDefault()

    try {
      if (state === 'Admin') {
        const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })


        if (data.success) {
          localStorage.setItem('aToken', data.token)

          SetAToken(data.token)
          // console.log(`your token is ${ data.token}`)
        }
      } else {

        const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password })
        if (data.success) {
          localStorage.setItem('dToken', data.token)

          SetDToken(data.token)
          console.log(`your dtoken is ${data.token}`)
        }

      }
    } catch (error) {
      //  const { data } = error.response;
      toast.error(error.message);
      console.log(error)
    }
  }

  return (
    <form onSubmit={onsubmitHandler} className='min-h-[80vh] flex items-center' >
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
        <p className='text-2xl font-semibold m-auto'><span className='text-[#5F6FFF]'>{state}</span>Login</p>
        <div className='w-full'>
          <p>Email</p>
          <input onChange={(e) => SetEmail(e.target.value)} value={email} className='border border-[#DADADA] rounded w-full pt-2 mt-1' type='email' required />
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input onChange={(e) => SetPassword(e.target.value)} value={password} className='border border-[#DADADA] rounded w-full pt-2 mt-1' type='password' required />
        </div>
        <button type='submit' className='bg-[#5F6FFF] text-white w-full py-2 rounded-md text-base'>Login</button>

        {
          state === `Admin`
            ? <p>Doctor Login  ?<span className='text-[#5F6FFF] underline cursor-pointer' onClick={() => SetState(`Doctor`)}>Click Here</span></p> :
            <p>Admin Login ? <span className='text-[#5F6FFF] underline cursor-pointer' onClick={() => SetState(`Admin`)}>Click Here</span></p>
        }

      </div>
    </form>
  )
}

export default Login
