import express from "express"
import { AddDoctor, AllDoctors, LoginAdmin, AppointmentAdmin, AppointmentCancel, AdminDashboard } from "../Controllers/adminController.js"
import upload from "../Middleware/multer.js"
import AuthAdmin from "../Middleware/Authadmin.js";
import { ChangeAvailability } from "../Controllers/DoctorController.js";


const adminRouter = express.Router();

adminRouter.post("/add-doctor", AuthAdmin, upload.single('image'), AddDoctor)
adminRouter.post("/login", LoginAdmin)
adminRouter.post("/all-doctors", AuthAdmin, AllDoctors)
adminRouter.post("/change-availability", AuthAdmin, ChangeAvailability)
adminRouter.get("/appointments", AuthAdmin, AppointmentAdmin)
adminRouter.post("/cancel-appointment", AuthAdmin, AppointmentCancel)
adminRouter.get("/dashboard", AuthAdmin, AdminDashboard)

export default adminRouter;