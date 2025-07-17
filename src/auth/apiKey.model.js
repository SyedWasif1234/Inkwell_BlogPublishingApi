import mongoose,{Schema} from "mongoose";

const keySchema = new Schema({
    key:{
        type:String,
        unique:true
    }
},{timestamps:true})

export const Keys = mongoose.model("Keys",keySchema)