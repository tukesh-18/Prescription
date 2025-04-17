import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets/assets'
import { AdminContext } from '../../context/AdminContext';
import { toast } from "react-toastify"
import axios from 'axios'

const AddDoctor = () => {
  
      //  This is the Page for Adding Doctor in the Project througn the Admin Login

  const [docImg, SetDocImg] = useState(false);
  const [name, SetName] = useState('');
  const [email, SetEmail] = useState('');
  const [password, SetPassword] = useState('');
  const [experience, SetExperience] = useState('1 Year');
  const [fees, SetFees] = useState('');
  const [About, SetAbout] = useState('');
  const [speciality, SetSpeciality] = useState('General physician');
  const [degree, SetDegree] = useState('');
  const [address1, SetAddress1] = useState('');
  const [address2, Setaddress2] = useState('');

  const { backendUrl, aToken } = useContext(AdminContext);


//  This is the Function for the Adding Doctor in Project

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (!docImg) {
        return toast.error('Image not selected')
      }
      const formData = new FormData()
      formData.append('image', docImg)
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('experience', experience)
      formData.append('fees', Number(fees))
      formData.append('about', About)
      formData.append('speciality', speciality)
      formData.append('degree', degree)
      formData.append('address', JSON.stringify({ line: address1, line2: address2 }))

      formData.forEach((value, key) => {
        console.log(`${key} : ${value}`)
      })
      const { data } = await axios.post(backendUrl + `/api/admin/add-doctor`, formData, { headers: { aToken } });

      if (data.success) {
        toast.success(data.message)
        SetDocImg(false)
        SetName('')
        SetPassword('')
        SetEmail('')
        SetAddress1('')
        Setaddress2('')
        SetAbout('')
        SetFees('')
        
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }
  return (
    <form onSubmit={onSubmitHandler} className='m-5 w-full'>

      <p className='mb-3 text-lg font-medium'>Add Doctor</p>
      <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll '>
        <div className='flex items-center gap-4 mb-8 text-gray-500'>
          <label htmlFor='doc_img'>
            <img className='w-16 bg-gray-100 rounded-full cursor-pointer' src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt='' />
          </label>
          <input onChange={(e) => SetDocImg(e.target.files[0])} type='file' id='doc_img' hidden />
          <p>Upload Doctor <br /> Picture</p>
        </div>

        <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <div className='flex-1 flex flex-col gap-1 '>
              <p>Doctor Name</p>
              <input onChange={(e) => SetName(e.target.value)} value={name} className='border rounded px-3 py-2' type="text" placeholder='name' required />
            </div>

            <div className='flex-1 flex flex-col gap-1 '>
              <p>Doctor Email</p>
              <input onChange={(e) => SetEmail(e.target.value)} value={email} className='border rounded px-3 py-2' type="email" placeholder='email' required />
            </div>

            <div className='flex-1 flex flex-col gap-1 '>
              <p>Doctor Password</p>
              <input onChange={(e) => SetPassword(e.target.value)} value={password} className='border rounded px-3 py-2' type="password" placeholder='Password' required />
            </div>

            <div className='flex-1 flex flex-col gap-1 '>
              <p>Experience</p>
              <select className='border rounded px-3 py-2' value={experience} onChange={(e) => SetExperience(e.target.value)} id='experience'>
                <option value="1 year">1 year</option>
                <option value="2 year">2 year</option>
                <option value="3 year">3 year</option>
                <option value="4 year">4 year</option>
                <option value="5 year">5 year</option>
                <option value="6 year">6 year</option>
                <option value="7 year">7 year</option>
                <option value="8 year">8 year</option>
                <option value="9 year">9 year</option>
                <option value="10 year">10 year</option>
              </select>
            </div>

            <div className='flex-1 flex flex-col gap-1 '>
              <p>Fees</p>
              <input className='border rounded px-3 py-2' type="number" placeholder='Fees' value={fees} onChange={(e) => SetFees(e.target.value)} required />
            </div>
          </div>

          <div className='w-full lg:flex-1 flex flex-col gap-4 '>
            <div className='flex-1 flex flex-col gap-1 '>
              <p>Speciality</p>
              <select className='border rounded px-3 py-2' value={speciality} onChange={(e) => SetSpeciality(e.target.value)} id='speciality'>
                <option value="General Physician">General Physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroentrologist">Gastroentrologist</option>
              </select>
            </div>

            <div className='flex-1 flex flex-col gap-1 '>
              <p>Education</p>
              <input className='border rounded px-3 py-2' type="text" placeholder='Education' value={degree} onChange={(e) => SetDegree(e.target.value)} required />
            </div>

            <div className='flex-1 flex flex-col gap-1 '>
              <p>Address</p>
              <input className='border rounded px-3 py-2' type='text' placeholder='Address 1' value={address1} onChange={(e) => SetAddress1(e.target.value)} required />
              <input className='border rounded px-3 py-2' type='text' placeholder='Address 2' value={address2} onChange={(e) => Setaddress2(e.target.value)} required />
            </div>
          </div>
        </div>

        <div>
          <p className='mt-4 mb-2'>About Doctor</p>
          <textarea className='w-full px-4 pt-2 border rounded' placeholder='Write About Doctor' rows={5} value={About} onChange={(e) => SetAbout(e.target.value)} required />
        </div>

        <button className='bg-[#5F6FFF] px-10 py-3 mt-4 text-white rounded-full'>Add Doctor</button>
      </div>

    </form>
  )
}

export default AddDoctor
