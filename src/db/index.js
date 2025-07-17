
import mongoose from "mongoose";

const DB_NAME = "Inkwell"

const connetDB = async() =>{
    try {

        const connectionInstence = await mongoose.connect(`${process.env.DB_URL}/${DB_NAME}`)
        console.log(`\n mongoDB connected !! DB HOST : ${connectionInstence.connection.host}`);
        
    } catch (error) {

        console.log("mongodb connection failed",error);
        process.exit(1)
        
    }
}

export default connetDB