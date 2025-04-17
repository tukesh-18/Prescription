import { useContext, useEffect } from "react";
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { AppContext } from "../context/AppContext";
import axios from "axios"
import { toast } from "react-toastify";

const Login = () => {

  const { backendUrl, token, SetToken } = useContext(AppContext)
  const navigate = useNavigate()
  const [state, SetState] = useState('Sign-Up')
  const [email, Setemail] = useState('');
  const [password, SetPassword] = useState('');
  const [name, SetName] = useState('')
  const [dob, Setdob] = useState('')

  const OnSubmitHandler = async (event) => {
    event.preventDefault();
    // console.log("Form State:", state);
    // console.log("Form Values:", { name, email, password });
    try {
      if (state === 'Sign-Up') {
        const { data } = await axios.post(backendUrl + '/api/user/register', { name, password, email, dob })
        console.log("Register response:", data);
        if (data.success) {
          localStorage.setItem('token', data.token)
          SetToken(data.token)
          toast.success(data.message);
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/user/login', { password, email })
        if (data.success) {
          localStorage.setItem('token', data.token)
          SetToken(data.token)
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      console.error("Error during register:", error);

      if (error.response) {
        console.error("Backend responded with error:", error.response.data);
        toast.error(error.response.data.message || "Registration failed");
      } else if (error.request) {
        console.error("No response received:", error.request);
        toast.error("No response from server. Check if backend is running.");
      } else {
        console.error("Error setting up request:", error.message);
        toast.error("Error in sending request");
      }
    }


  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token, navigate])

  return (
    <form onSubmit={OnSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          {
            state === 'Sign-Up' ? 'Create Account' : 'Login'
          }
        </p>
        <p>Please {state === 'Sign-Up' ? 'Sign Up' : 'Login'} to book Appointment</p>
        {
          state === 'Sign-Up' &&
          <div className="w-full">
            <p>Full Name</p>
            <input className="border border-zinc-300 rounded w-full pt-2 mt-1" type="text" value={name} onChange={(e) => SetName(e.target.value)} required />
          </div>
        }
        <div className="w-full">
          <p>Email</p>
          <input className="border border-zinc-300 rounded w-full pt-2 mt-1" type="email" value={email} onChange={(e) => Setemail(e.target.value)} required />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input className="border border-zinc-300 rounded w-full pt-2 mt-1" type="password" value={password} onChange={(e) => SetPassword(e.target.value)} required />
        </div>
        {state === 'Sign-Up' &&
          <div className="w-full">
            <p>Date of Birth</p>
            <input
              className="border border-zinc-300 rounded w-full pt-2 mt-1"
              type="date"
              value={dob}
              onChange={(e) => Setdob(e.target.value)}
              required
            />
          </div>
        }

        <button type="submit" className="bg-blue-400 text-white w-full py-2 rounded-md text-base">{state === 'Sign-Up' ? 'Create Account' : 'Login'}</button>
        {
          state === 'Sign-Up' ?
            <p>Already have an Account? <span onClick={() => SetState('Login')} className="text-blue-400 underline cursor-pointer">Login here</span> </p> :
            <p>Create a New Account ? <span onClick={() => SetState('Sign-Up')} className="text-blue-400 underline cursor-pointer">Click here</span> </p>
        }
      </div>

    </form>
  )
}

export default Login
