import express from "express"
import { getProfile, registerController, updateProfile, UserLoginController, bookAppointment, listAppointment, cancelAppointment } from "../Controllers/UserController.js";
import AuthUser from "../Middleware/authUser.js";
import upload from "../Middleware/multer.js"

const UserRouter = express.Router();

UserRouter.post("/register", registerController);
UserRouter.post("/login", UserLoginController)

UserRouter.get("/get-profile", AuthUser, getProfile);
UserRouter.post("/update-profile", upload.single('image'), AuthUser, updateProfile)
UserRouter.post('/book-appointment', AuthUser, bookAppointment)
UserRouter.post("/appointment", AuthUser, listAppointment)
UserRouter.post('/cancel-appointment', AuthUser, cancelAppointment)

export default UserRouter;
