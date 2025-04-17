import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    image: {
        type: String,
        required: [true, 'Image is required']
    },
    speciality: {
        type: String,
        required: [true, 'Speciality is required']
    },
    degree: {
        type: String,
        required: [true, 'Degree is required']
    },
    experience: {
        type: String,
        required: [true, 'Experience is required']
    },
    about: {
        type: String,
        required: [true, 'About is required']
    },
    available: {
        type: Boolean,
        default: true
    },
    fees: {
        type: Number,
        required: [true, 'Fees is required']
    },
    address: {
        type: Object,
        required: [true, 'Address is required']
    },
    date: {
        type: Date,
        required: [true, 'Date is required']
    },
    slots_booked: {
        type: Object,
        default: {}
    }
}, { minimize: false })

const doctorModel = mongoose.model.doctor || mongoose.model('doctor', doctorSchema)

export default doctorModel;