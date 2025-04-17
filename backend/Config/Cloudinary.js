import { v2 as cloudinary } from "cloudinary"


const ConnectCloudinary = async () =>{

  try {
    cloudinary.config({
        cloud_name:process.env.CLOUDINARY_NAME,
        api_key:process.env.CLOUDINARY_API_KEY,
        api_secret:process.env.CLOUDINARY_SECRET_KEY
    })
    console.log("Cloudinary Connected SuccessFully");
    
    
  } catch (error) {
    console.log("cloudinary Conncection Failed " + error)
  }

}

export default ConnectCloudinary;