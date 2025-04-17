import validator from "validator"
import bcrypt from "bcryptjs"
import { v2 as cloudinary } from "cloudinary"
import doctorModel from "../Models/doctorModel.js"
import JWT from "jsonwebtoken"
import appointModel from "../Models/AppoitmentModel.js"
import UserModel from "../Models/UserModel.js"


//API for Adding Doctor
const AddDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body
        const imageFile = req.file
        const date = Date.now();
        // Checking for all the data to add doctor ans save to database
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.status(404).send({
                success: false,
                message: "Enter alll the data mentioned"
            })
        }
        //Validating Email format 
        if (!validator.isEmail(email)) {
            return res.status(404).send({
                success: false,
                message: "Email is valid enter the valid email"
            })
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Please provide hte strong password" })
        }

        // Hashing The Password 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
        const imageUrl = imageUpload.secure_url

        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date
        }

        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save();

        res.status(201).send({
            success: true,
            message: "Doctor Added sucessfully"
        })

    } catch (error) {
        console.error(error)
        res.status(500).send({
            success: false,
            message: "Failed to Add doctor"
        })
    }
}

// Api For Admin Login 
const LoginAdmin = async (req, res) => {
    try {

        const { email, password } = req.body
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {

            const token = JWT.sign(email + password, process.env.JWT_SECRET)
            res.json({ success: true, token })

        } else {
            res.status(401).send({
                success: false,
                message: "Invalid Credentials"
            })

        }

    } catch (error) {
        console.error(error)
        res.status(500).send({
            success: false,
            message: "Failed to Add doctor"
        })
    }
}

//Api to get All the doctors in Admin Panel

const AllDoctors = async (req, res) => {
    try {

        const doctors = await doctorModel.find({}).select('-password')
        res.status(200).send({
            success: true,
            doctors
        })

    } catch (error) {
        console.error(error)
        res.status(500).send({
            success: false,
            message: "Failed to fetch all doctors"
        })
    }
}

//   Api to get all appointment list
const AppointmentAdmin = async (req, res) => {
    try {

        const appointments = await appointModel.find({})
        res.status(200).send({
            success: true,
            message: "fetched all the appointments",
            appointments
        })

    } catch (error) {
        console.error(error)
        res.status(500).send({
            success: false,
            message: "Failed to fetch all appointments"
        })
    }
}

// APi to cancel the Appointment 
const AppointmentCancel = async (req, res) => {
    try {
        const { appointmentId } = req.body
        const appointmentData = await appointModel.findById(appointmentId)

        await appointModel.findByIdAndUpdate(appointmentId, { cancelled: true })

        //releasing doctor slots

        const { docId, slotDate, slotTime } = appointmentData
        const doctorData = await doctorModel.findById(docId)

        let slots_booked = doctorData.slots_booked
        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

        await doctorModel.findByIdAndUpdate(docId, { slots_booked })
        res.status(200).send({
            success: true,
            message: "Appointment cancelled successfully"
        })

    } catch (error) {
        console.error(error)
        res.status(500).send({
            success: false,
            message: "Failed to cancel the Appointment"
        })
    }
}

// Api to get Dashboard Data for Admin Panel

const AdminDashboard = async (req, res) => {
    try {
        const doctors = await doctorModel.find({});
        const users = await UserModel.find({})
        const appointments = await appointModel.find({})

        const dashData = {
            doctors: doctors.length,
            appointments: appointments.length,
            patients: users.length,
            latestAppointments: appointments.reverse().slice(0, 5)
        }

        res.status(200).send({
            success: true,
            message: "fetched the dashData successfully",
            dashData
        })

    } catch (error) {
        console.error(error)
        res.status(500).send({
            success: false,
            message: "Failed to load data for Admin Panel"
        })
    }
}

export { AddDoctor, LoginAdmin, AllDoctors, AppointmentAdmin, AppointmentCancel, AdminDashboard };