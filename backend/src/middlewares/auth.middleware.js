import jwt  from "jsonwebtoken"

export const auth  = ((req,res,next)=>{
    try{
        const token = req.cookies.token;
         if(!token){
            return res.status(401).json({ message: "Please login first" });
         }
         const decord  = jwt.verify(token,process.env.JWT_SECRET)
         console.log("DEcorded data is :", decord)
         req.user = decord
         next()
    }catch (err){
       console.log("suth middleware failure")
        return res.status(401).json({
        success: false,
        message : "internal server error"
    })
    }
})