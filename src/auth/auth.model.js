import mongoose , {Schema} from "mongoose";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

const UserSchema = new Schema({
     name: {
        type: String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    refreshToken:{
        type: String
       },
    role:{
        type:String,
        enum:["USER" , "ADMIN"],
        default:"USER",
    },
    api_key:{
        type: Schema.Types.ObjectId,
        ref:"Keys"
    }
},{timestamps:true})

UserSchema.pre('save', async function(next){
     if(!this.isModified("password") ) return next;
    this.password = await bcrypt.hash(this.password,10);
})

UserSchema.methods.isPasswordCorrect =  async function (password){
    return await bcrypt.compare(password,this.password);
}

UserSchema.methods.GenerateAccessToken = async function (){

    const accessToken =  jwt.sign(
        {
        _id:this._id,
        email : this.email,
        name : this.name,
        },
        process.env.ACCESSTOKEN_SECRET,
        {
        expiresIn: process.env.ACCESSTOKEN_EXPIRY
        }
    )
    console.log("this is access token function in user model");
    console.log(accessToken)
    return accessToken;
}

UserSchema.methods.GenerateRefreshToken = async function (){

    const refreshToken =  jwt.sign(
        {
        _id:this._id,
        
        },
        process.env.REFRESHTOKEN_SECRET,
        {
        expiresIn: process.env.REFRESHTOKEN_EXPIRY
        }
    )
    console.log("this is refresh token function in user model");
    console.log(refreshToken);
    
    return refreshToken;
}

export const Users = mongoose.model("Users",UserSchema)