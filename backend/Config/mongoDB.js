import mongoose from "mongoose";

const ConnectDB = async () =>{
    try {
         //Connecting Databse
         await mongoose.connect(process.env.MONGO_URL) 
        console.log("Database Connected Successfully ")

    } catch (error) {
        console.log(`Got an Error while connecting to Databse ${error}`)
    }
}

export default ConnectDB;