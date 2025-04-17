import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Doctors from "./pages/Doctors"
import Login from "./pages/Login"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Profile from "./pages/Profile"
import MyAppointments from "./pages/MyAppointments"
import Appointment from "./pages/Appointment"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className="mx-20 sm:mx-[10%]">
      <ToastContainer />
      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/myappointment" element={<MyAppointments />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/appointment/:docId" element={<Appointment />} />

      </Routes>
      <Footer />

    </div>
  )
}

export default App
