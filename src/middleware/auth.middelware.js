import jwt from "jsonwebtoken";
import { Users } from "../auth/auth.model.js";

export const authMiddleware = async (req,res,next) =>{
    try {

        const  Token = req.cookies?.accessToken ;
        if(!Token){
           res.status(404).send({
            success:false,
            message:"TOKEN IS NOT GENERATED",
            error
           })
        }
        const DecodeToken = jwt.verify(Token, process.env.ACCESSTOKEN_SECRET) ;
        
        const user= await Users.findById(DecodeToken?._id).select("-password  -refreshToken")
        if(!user){
            res.status(404).send({
                success:false,
                message:"USER NOT FOUND",
                error
               })
        }

        console.log(user)
        req.user = user
        next()

        
    } catch (error) {

        console.log("error occured in auth middleware:",error)

        res.status(505).send({
            success:false,
            message:"SOMTHNG WENT  WRONG WHILE VERIFICATION OF TOKEN",
            error
           })
    }
}
