import { useContext, useState } from "react"

import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";


const Profile = () => {
  const { userData, SetUserData, UpdateProfileData } = useContext(AppContext)

  const [isEdit, SetIsEdit] = useState(false);

  return userData && (
    <div className="max-w-lg flex flex-col gap-2 text-sm">
      {/* {
        isEdit ?
          <input type="file" accept="image/*" onChange={(e) => SetUserData(prev => ({ ...prev, imageFile: e.target.files[0] }))} />
          : <img className="w-36 rounded" src={userData.image} alt="" />
      } */}

      {isEdit ? (
        <>
          <input
            type="file"
            id="doc_img"
            accept="image/*"
            className="hidden"
            onChange={(e) =>
              SetUserData((prev) => ({
                ...prev,
                imageFile: e.target.files[0],
                image: URL.createObjectURL(e.target.files[0]), // show preview
              }))
            }
          />
          <label htmlFor="doc_img">
            <img
              className="w-36 rounded-full cursor-pointer bg-gray-100"
              src={userData.image || assets.upload_area}
              alt="upload"
            />
            Upload Profile Photo
          </label>
        </>
      ) : (
        <img className="w-36 rounded" src={userData.image} alt="profile" />
      )}


      {
        isEdit ? <input className="bg-gray-50 text-3xl font-medium max-w-60 mt-4" type="text" value={userData.name} onChange={(e) => SetUserData(prev => ({ ...prev, name: e.target.value }))} /> :
          <p className="font-medium text-3xl text-neutral-800 mt-4">{userData.name}</p>
      }
      <hr className="bg-zinc-400 h-[1px] border-none" />
      <div>
        <p className="text-neutral-500 underline mt-3">CONTACT INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Email id:</p>
          <p className="text-blue-500">{userData.email}</p>
          <p className="font-medium">Phone :</p>
          {
            isEdit ? <input className="bg-gray-100 max-w-52" type="text" value={userData.phone} onChange={(e) => SetUserData(prev => ({ ...prev, phone: e.target.value }))} /> :
              <p className="text-blue-400">{userData.phone}</p>
          }
          <p className="font-medium">Address:</p>
          {
            isEdit ?
              <p>
                <input className="bg-gray-50" value={userData.address.line1} onChange={(e) => SetUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} type="text" />
                <br />
                <input className="bg-gray-50" value={userData.address.line2} onChange={(e) => SetUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} type="text" />
              </p> :
              <p className="text-gray-500">
                {userData.address.line1}
                <br />
                {userData.address.line2}
              </p>
          }
        </div>
      </div>
      <div>
        <p className="text-neutral-500 underline mt-3">Basic Information</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Gender:</p>
          {
            isEdit ? <select className="max-w-20 bg-gray-100 " value={userData.gender || ''} onChange={(e) => SetUserData(prev => ({ ...prev, gender: e.target.value }))}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select> :
              <p className="bg-gray-200 w-[80px]">{userData.gender}</p>
          }
          <p>Birthday:</p>
          {
            isEdit ? <input className="max-w-28 bg-gray-100 " value={userData.dob || ''} onChange={(e) => SetUserData(prev => ({ ...prev, dob: e.target.value }))} type="date" /> :
              <p className="bg-gray-200 w-[80px]">{userData.dob}</p>
          }
          {
            console.log(userData.dob)
          }
        </div>
      </div>
      <div className="mt-10">
        {
          isEdit ? <button className="border border-blue-400 px-8 py-2 rounded-full hover:bg-blue-900 hover:text-white transition-all " onClick={async () => { await UpdateProfileData(); SetIsEdit(false); }}>Save Information</button>
            : <button className="border border-blue-400 px-8 py-2 rounded-full hover:bg-blue-900 hover:text-white transition-all" onClick={() => SetIsEdit(true)}>Edit</button>
        }
      </div>
    </div>
  )
}

export default Profile
