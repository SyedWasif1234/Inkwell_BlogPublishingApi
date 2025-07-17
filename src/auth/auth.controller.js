import { Users } from "./auth.model.js";
import crypto from "crypto"
import { Keys } from "./apiKey.model.js";

const GenerateandRefreshAccessToken =  async  (user_id)=>{
    try {

        // yhaan hmm problem face kre the await lggaana bhul gy the access and refresh token me jo function hai uske aage and user.refreshToken ki jgaah user.RefreshToken likh rhe the since user model me refreshToken likhe the to yaah bhi whi likhna tha , return {} brakets ke ander hoga ,and function lo call kerne wakt await lgaana zroori hai ,or user.model.js me jhaan token generate and refresh kr rhe whaan return krna zroori hai jaise kre hai hmm wo updated hai
       
        const user = await Users.findById(user_id);
        const AccessToken =  await user.GenerateAccessToken();
        const RefreshToken =  await user.GenerateRefreshToken();
        user.refreshToken = RefreshToken
        await user.save({validateBeforeSave: false})
        return {AccessToken,RefreshToken}

    } catch (error) {

        console.log("error occured while  generating access and refresh token",error);
        
    }
}

export async function HandleSignup(req,res){
    try {
        const {name,email,password} = req.body;
        if(!(name || email || password ) ){
            res.status(400).send({
                success: false,
                message:"Error in register Api",
                error
            })
        }
        const registerUser =  await Users.create({
            name,
            email,
            password,
        })

        const{AccessToken,RefreshToken} = await GenerateandRefreshAccessToken(registerUser._id)
        const options ={
        httpOnly: true,
        secure: true
        // jb ye dono true krte hai then cookies is modifiable only from server
        }
    
        res
        .status(200)
        .cookie("accessToken",AccessToken,options)
        .cookie("refreshToken",RefreshToken,options)
        .send({
            success:true,
            message:"user loged in succefully",
            User:registerUser,
            AccessToken,
            RefreshToken
        })
    
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in register api",
            error
        }) 
    }
}

export async function login(req,res){
   const {name , email, password} = req.body;
    if(!( email || password)) {
        res.status(401).send({
            success:false,
            message:"email or password is required",
            error
        })
    }
    const user = await Users.findOne({
        $or : [{name},{email}]
    })
    if(!user){
        res.status(401).send({
            success:false,
            message:"No user found",
            error
        })
    }
    const isPasswordValid = await user.isPasswordCorrect(password);
    if(!isPasswordValid) {
        res.status(401).send({
            message:"Incorrect password"
        })
    }
    const {AccessToken,RefreshToken} =  await GenerateandRefreshAccessToken(user._id);
    const LogedInUser = await  Users.findById(user._id).select("-password  -RefreshToken")
    console.log("this is logged in user",LogedInUser);
    const options ={
        httpOnly: true,
        secure: true
        // jb ye dono true krte hai then cookies is modifiable only from server
    }
    
    res
    .status(200)
    .cookie("accessToken",AccessToken,options)
    .cookie("refreshToken",RefreshToken,options)
    .send({
        success:true,
        message:"user loged in succefully",
        LogedInUser,
        AccessToken,
        RefreshToken
    })

}

export async function GetUserProfile(req, res){

  try {
      const user = await Users.findById(req.user._id).select("-password -refreshToken");
      res.status(201).send({
          success:true,
          message:"user Profile fetched succesfully",
          user
      })
  } catch (error) {
    console.log("error occured while fetching profile:",error)
    res.status(500).json({message:"error occured while fetching profile",error})
  }
}

export async function GenerateApiKey(req, res){
   try {
    const userId = req.user._id;

     const key = await Keys.create({
        key:crypto.randomBytes(10).toString("hex")
     })

     const user = await Users.findByIdAndUpdate(userId, { api_key: key._id });

     res.status(400).json({
        message:"api key generated successfuly" ,
         user
        })

   } catch (error) {
    console.log("error generating api key:", error);
    res.status(500).json({
        message:"error generating api key",
        error
    })
   }
}

export async function getUserapiKey(req,res){

    const userId = req.user._id;
    const user = await Users.findOne({_id:userId}).populate("api_key");
    
    res.status(200).json({
        message:"user fetched successfullly",
        user:user
    })
}