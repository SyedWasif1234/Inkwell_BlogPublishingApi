import mongoose,{Schema} from "mongoose";

const categorySchema = new Schema({
    name:{
        type:String,
        unique:true
    }
},{timeseries:true})

export const Categories = mongoose.model("Categories", categorySchema)