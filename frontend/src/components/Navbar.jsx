
import { NavLink, useNavigate } from "react-router-dom"
import { assets } from "../assets/assets.js"
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext.jsx";

const Navbar = () => {

  const navigate = useNavigate();
  const [Menu, SetMenu] = useState(false);
  const { token, SetToken, userData } = useContext(AppContext)

  const logout = () => {
    SetToken(false)
    localStorage.removeItem('token')
  }


  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      <img onClick={() => { navigate('/') }} className="w-44 cursor-pointer" src={assets.logo} alt="" />
      <ul className="hidden md:flex items-center space-x-4 font-semibold ">
        <NavLink to='/'>

          <li className="py-1">Home</li>
          <hr className="border-none outline-none h-0.5 bg-blue-500 w-3/5 m-auto hidden" />

        </NavLink>
        <NavLink to='/doctors'>

          <li className="py-1">All Doctors</li>
          <hr className="border-none outline-none h-0.5 bg-blue-500 w-3/5 m-auto hidden" />

        </NavLink>
        <NavLink to='/about'>

          <li className="py-1">About</li>
          <hr className="border-none outline-none h-0.5 bg-blue-500 w-3/5 m-auto hidden" />

        </NavLink>
        <NavLink to='/contact'>

          <li className="py-1">Contact</li>
          <hr className="border-none outline-none h-0.5 bg-blue-500 w-3/5 m-auto hidden" />

        </NavLink>

      </ul>

      <div className="flex items-center gap-3">

        {
          token
            ? <div className="flex items-center gap-2 cursor-pointer group relative">
              <img className="w-8 rounded-full" src={userData.image} alt="" />
              <img className="w-2.5" src={assets.dropdown_icon} alt="" />
              <div className="absolute top-0 right-0 pt-11 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
                <div className="w-40 p-4 bg-stone-100 rounded flex flex-col">
                  <p onClick={() => navigate('profile')} className="hover:text-black cursor-pointer">My Profile</p>
                  <p onClick={() => navigate('myappointment')} className="hover:text-black cursor-pointer">My Appointment</p>
                  <p onClick={logout} className="hover:text-black cursor-pointer">Logout</p>
                </div>
              </div>
            </div>
            :
            <button onClick={() => navigate('/login')} className="bg-pink-400 text-black px-8 py-3 rounded-full font-light hidden md:block">Create Account</button>
        }
        <img onClick={() => SetMenu(true)} className="w-6 md:hidden" src={assets.menu_icon} alt="" />
        {/* ----------Mobile Menu --------- */}
        <div className={`${Menu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
          <div className='flex items-center justify-between px-5 py-6'>
            <img className="w-36" src={assets.logo} alt="" />
            <img className="w-7" onClick={() => SetMenu(false)} src={assets.cross_icon} alt="" />
          </div>
          <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
            <NavLink onClick={() => { SetMenu(false) }} to="/" > <p className="px-4 py-2 rounded inline-block">Home</p></NavLink>
            <NavLink onClick={() => { SetMenu(false) }} to="/doctors" ><p className="px-4 py-2 rounded inline-block">ALL Doctors</p></NavLink>
            <NavLink onClick={() => { SetMenu(false) }} to="/about" ><p className="px-4 py-2 rounded inline-block">About</p></NavLink>
            <NavLink onClick={() => { SetMenu(false) }} to="/contact" ><p className="px-4 py-2 rounded inline-block">Contact Us</p></NavLink>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar
