import mongoose, { Schema } from "mongoose";

const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique:true
    },
    content:{
        type:String,
        required: true,
    },
    status:{
        type: String,
        enum:["PENDING","APPROVED","REJECTED"],
        default:"PENDING",
    },
    User:{
        type: Schema.Types.ObjectId,
        ref:"Users"
    },
    likes: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Users' 
    }],
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users'
    }],
    views: { 
        type: Number, 
        default: 0 
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Categories'
    }
   
},{timestamps:true})

export const Posts = mongoose.model("Posts",PostSchema)