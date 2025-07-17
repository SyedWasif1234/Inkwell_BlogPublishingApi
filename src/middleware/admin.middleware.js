export const CheckAdmin =(req,res,next)=>{
   try {
     const role = req.user?.role;
     if(role==="ADMIN") {
         next()
     } else {
            res.status(400).json({message:"Unouthorised"})
        }
   } catch (error) {
    console.log("error occured in admin middleware: ",error)
    res.status(500).josn({message:"error occured in admin middleware" , error})
   }
}