import validator from "validator"
import bcrypt from "bcryptjs"
import UserModel from "../Models/UserModel.js"
import JWT from "jsonwebtoken"
import { v2 as cloudinary } from "cloudinary"
import doctorModel from "../Models/doctorModel.js"
import appointModel from "../Models/AppoitmentModel.js"
import razorpay from "razorpay"


//Api to register User

const registerController = async (req, res) => {
    try {

        const { name, email, password, dob } = req.body

        if (!name || !email || !password || !dob) {
            return res.status(404).send({
                success: false,
                message: "Enter all the fields"
            })
        }

        // Validating email  

        if (!validator.isEmail(email)) {
            return res.status(404).send({
                success: false,
                message: "Email is not valid"
            })
        }

        //Validating Strong Password

        if (password.length < 8) {
            return res.status(404).send({
                success: false,
                message: "Password is not valid"
            })
        }

        //Hashing User Password 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashedPassword,
            dob
        }

        const newUser = new UserModel(userData)
        const user = await newUser.save();



        return res.status(201).send({
            success: true,
            message: "User Created or registered successfully"

        })

    } catch (error) {
        console.error(error)
        res.status(500).send({
            success: false,
            message: "Failed to register the user"
        })
    }
}


// Api for User Login


const UserLoginController = async (req, res) => {
    try {

        const { email, password } = req.body
        const user = await UserModel.findOne({ email })


        if (!user) {
            return res.status(404).send({
                success: false,
                message: "user not found"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(404).send({
                success: false,
                message: "Entered the wrong password"
            })
        }

        const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "2d" });

        res.status(200).send({
            success: true,
            message: "User Login successfull",
            token

        })

    } catch (error) {
        console.error(error)
        res.status(500).send({
            success: false,
            message: "Failed to register the user"
        })
    }
}

//API to get User Profile data

const getProfile = async (req, res) => {
    try {

        const { userId } = req.body
        const userData = await UserModel.findById(userId).select('-password');
        res.json({
            success: true,
            userData
        })

    } catch (error) {
        console.error(error)
        res.status(500).send({
            success: false,
            message: "Failed to get the user Profile"
        })
    }
}

//Api to update the user Profile

const updateProfile = async (req, res) => {
    try {

        // const {userId, name, phone, address, dob, gender} = req.body
        let { userId, name, phone, address, dob, gender } = req.body;
        // const parsedAddress = JSON.parse(address);
        // console.log(parsedAddress)
        //    console.log(address.line1)
        //    console.log(address.line2)

        if (typeof (address) === 'string') {
            address = JSON.parse(address);
        }

        const imageFile = req.file

        if (!name || !userId || !phone || !address || !dob || !gender) {
            res.status(404).send({
                success: false,
                message: "ente rall the fields"
            })
        }
        await UserModel.findByIdAndUpdate(userId, { name, phone, address, dob, gender });

        if (imageFile) {
            //upload image to cloudinary 

            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' })
            const imageURL = imageUpload.secure_url

            await UserModel.findByIdAndUpdate(userId, { image: imageURL })

        }

        res.status(201).send({
            success: true,
            message: "Profile updated successfully",
            userId
        })

    } catch (error) {
        console.error(error)
        res.status(500).send({
            success: false,
            message: "Failed to update the user Profile"
        })
    }
}

// Api to Book appointment
const bookAppointment = async (req, res) => {
    try {

        const { userId, docId, slotDate, slotTime } = req.body

        const docData = await doctorModel.findById(docId).select('-password')
        if (!docData.available) {
            return res.status(404).send({
                success: false,
                message: "doctor is not available"
            })
        }
        let slots_booked = docData.slots_booked;

        // Checking for slots availability

        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.status(404).send({
                    success: false,
                    message: "slot is not available"
                })
            } else {
                slots_booked[slotDate].push(slotTime)
            }
        } else {
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }

        const userData = await UserModel.findById(userId).select('-password')

        delete docData.slots_booked

        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotDate,
            slotTime,
            date: Date.now()
        }
        // console.log("Incoming appointment booking data:", req.body);

        const newAppointment = new appointModel(appointmentData)
        await newAppointment.save()

        //save new slots data in docData

        await doctorModel.findByIdAndUpdate(docId, { slots_booked })
        res.status(201).send({
            success: true,
            message: "Appointment Booked"
        })

    } catch (error) {
        console.error(error)
        res.status(500).send({
            success: false,
            message: "Failed to Book an Appointment"
        })
    }
}

//APi to get the user Appointment for the frontend 

const listAppointment = async (req, res) => {
    try {

        const { userId } = req.body
        const appointments = await appointModel.find({ userId })
        res.status(200).send({
            success: true,
            message: "successfully fetched the Appointments",
            appointments
        })

    } catch (error) {
        console.error(error)
        res.status(500).send({
            success: false,
            message: "Failed to load the Appointment list"
        })
    }

}

//Api to cancel the Appointment
const cancelAppointment = async (req, res) => {
    try {
        const { userId, appointmentId } = req.body
        const appointmentData = await appointModel.findById(appointmentId)

        if (appointmentData.userId !== userId) {
            return res.status(401).send({
                success: false,
                message: "user with this appointment not found"
            })
        }

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

// const razorpayInstance = new razorpay({
//     key_id:'',
//     key_secret:''
// })
// // Api to make payment of Appointment
// const paymentRazorpay = async(req,res)=>{
//      try {

//      } catch (error) {

//      }
// }

export { registerController, UserLoginController, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment }