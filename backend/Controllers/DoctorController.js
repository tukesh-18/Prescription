import doctorModel from "../Models/doctorModel.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import appointModel from "../Models/AppoitmentModel.js"

// Api to Change the Avalilability of Doctor
const ChangeAvailability = async (req, res) => {
  try {

    const { docId } = req.body
    const docData = await doctorModel.findById(docId)
    await doctorModel.findByIdAndUpdate(docId, { available: !docData.available })

    return res.status(200).send({
      success: true,
      message: "Availability changed"
    })

  } catch (error) {
    console.error(error)
    res.status(500).send({
      success: false,
      message: "Failed to Change the Availability of Doctor"
    })
  }
}

// Api to get All the doctors

const doctorList = async (req, res) => {
  try {

    const doctors = await doctorModel.find({}).select(['-password', '-email'])
    return res.json({ success: true, doctors })

  } catch (error) {
    console.error(error)
    res.status(500).send({
      success: false,
      message: "Failed to Change the Availability of Doctor"
    })
  }
}

//  Api for Doctor Login

const LoginDoctor = async (req, res) => {
  try {

    const { email, password } = req.body;

    const doctor = await doctorModel.findOne({ email })

    if (!doctor) {
      return res.status(404).send({
        success: false,
        message: "Invalid Credentials"
      })
    }

    const isMatch = await bcrypt.compare(password, doctor.password);

    if (!isMatch) {
      return res.status(404).send({
        success: false,
        message: "Invalid password"
      })
    }

    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET)
    return res.status(200).send({
      success: true,
      message: "Login Successfull",
      token
    })

  } catch (error) {
    console.error(error)
    res.status(500).send({
      success: false,
      message: "Failed to Login as a Doctor"
    })
  }
}

// APi to get the Appointment for the Doctor Panel
const AppointmentsDocotr = async (req, res) => {
  try {

    const { docId } = req.body

    const Appointments = await appointModel.find({ docId })

    return res.status(200).send({
      success: true,
      message: "successfully fetched the Appointment for Doctor Panel",
      Appointments
    })

  } catch (error) {
    console.error(error)
    res.status(500).send({
      success: false,
      message: "Failed to fetch the Appointment for Doctor Panel"
    })
  }
}

// Api to mark the Appointment complete for doctor

const appointmentComplete = async (req, res) => {
  try {

    const { docId, appointmentId } = req.body;

    const appointmentData = await appointModel.findById(appointmentId);
    if (appointmentData && appointmentData.docId === docId) {
      await appointModel.findByIdAndUpdate(appointmentId, { isCompleted: true })
      return res.status(200).send({
        success: true,
        message: "Completed the Appointment SuccessFully"
      })
    } else {
      return res.status(500).send({
        success: false,
        message: "Failed to get the Appointment"
      })
    }



  } catch (error) {
    console.error(error)
    res.status(500).send({
      success: false,
      message: "Failed to Complete the Appointment"
    })
  }
}

// Api to mark the Appointment Cancel for doctor

const appointmentCancel = async (req, res) => {
  try {

    const { docId, appointmentId } = req.body;

    const appointmentData = await appointModel.findById(appointmentId);
    if (appointmentData && appointmentData.docId === docId) {
      await appointModel.findByIdAndUpdate(appointmentId, { cancelled: true })
      return res.status(200).send({
        success: true,
        message: "Cancelled the Appointment SuccessFully"
      })
    } else {
      return res.status(500).send({
        success: false,
        message: "Failed to get the Appointment"
      })
    }



  } catch (error) {
    console.error(error)
    res.status(500).send({
      success: false,
      message: "Failed to Cancel the Appointment"
    })
  }
}

// Api to get Doctor Data for Dashbord of Doctor Panel

const DoctorDashboard = async (req, res) => {
  try {

    const { docId } = req.body;

    const appointments = await appointModel.find({ docId })

    let earning = 0;

    appointments.map((item) => {
      if (item.isCompleted || item.payment) {
        earning += item.amount
      }
    })

    let patients = []

    appointments.map((item) => {
      if (!patients.includes(item.userId)) {
        patients.push(item.userId)
      }
    })

    const dashData = {
      earning,
      appointments: appointments.length,
      patients: patients.length,
      latestAppointments: appointments.reverse().slice(0, 5)
    }

    return res.status(200).send({
      success: true,
      message: "success to get the data for doctor dashbord",
      dashData
    })

  } catch (error) {
    console.error(error)
    res.status(500).send({
      success: false,
      message: "failed to get the data for doctor dashbord"
    })
  }
}

// Api to get the Doctor profile

const DoctorProfile = async (req, res) => {
  try {

    const { docId } = req.body
    const profileData = await doctorModel.findById(docId).select('-password')
    return res.status(200).send({
      success: true,
      message: "successfully got the profileData",
      profileData
    })

  } catch (error) {
    console.error(error)
    res.status(500).send({
      success: false,
      message: "failed to get the data for doctor profile"
    })
  }
}

// Api to Update the DoctorProfile

const UpdatedocProfile = async (req, res) => {
  try {

    const { docId, fees, address, available } = req.body
    await doctorModel.findByIdAndUpdate(docId, { fees, address, available })

    return res.status(200).send({
      success: true,
      message: "Doctor Profile Updated"
    })

  } catch (error) {
    console.error(error)
    res.status(500).send({
      success: false,
      message: "failed to get the data for doctor profile"
    })
  }
}

export {
  ChangeAvailability,
  doctorList,
  LoginDoctor,
  AppointmentsDocotr,
  appointmentComplete,
  appointmentCancel,
  DoctorDashboard,
  DoctorProfile,
  UpdatedocProfile
}