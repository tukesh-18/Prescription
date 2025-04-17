import express, { Router } from "express"
import {
    doctorList, LoginDoctor, AppointmentsDocotr, UpdatedocProfile, DoctorProfile,
    appointmentComplete, appointmentCancel, DoctorDashboard
} from "../Controllers/DoctorController.js";
import AuthDoctor from "../Middleware/authDoctor.js";

const doctorRouter = express.Router();


doctorRouter.get('/list', doctorList)
doctorRouter.post('/login', LoginDoctor)
doctorRouter.post('/appointments', AuthDoctor, AppointmentsDocotr)
doctorRouter.post('/complete-appointment', AuthDoctor, appointmentComplete)
doctorRouter.post('/cancel-appointment', AuthDoctor, appointmentCancel)
doctorRouter.get('/dashboard', AuthDoctor, DoctorDashboard)
doctorRouter.get('/profile', AuthDoctor, DoctorProfile)
doctorRouter.post('/update-profile', AuthDoctor, UpdatedocProfile)

export default doctorRouter;