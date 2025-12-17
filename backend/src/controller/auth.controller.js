
import mongoose from "mongoose";
import { User } from "../models/user_models.js";
import jwt from "jsonwebtoken"
import { asyncHandler } from "../utils/asyncHandler.js";



export const register  = asyncHandler(async(req,res)=>{


  console.log("METHOD:", req.method);
  console.log("URL:", req.originalUrl);
  console.log("HEADERS:", req.headers["content-type"]);
  console.log("BODY:", req.body);
    


   const {username , password , email}  = req.body;
   

     if(!username || !email  || !password){
        throw new Error( "all fileds are required");
     }

     const ExistUser  = await User.findOne({
        $or : [{email} , {username}]
     })

     if(ExistUser){
        throw new Error( "User is Exisr already");
     }

     const user  = await User.create({
        username,
        password,
        email,
        isEmailVerified : false
     })

     return res.status(201).json({
        message : "new User is created",
        username : user.username
     })
    
});

export const LoginUser = asyncHandler(async(req,res)=>{

  
     const { email, password } = req.body;
  
       if(!email || !password){
        throw new Error("Both email and password are required ")
        }
 
      const user = await User.findOne({email})
 
       if(!user){
            throw new Error("User does not exist");
        }
        
          let comparepassword = await user.ispasswordisCorrect(password)
          if(!comparepassword){
            throw new Error("Password is incorrect")
          }

      const token = jwt.sign(
        { userId: user._id },
         process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
    // ✅ Store JWT in httpOnly cookie
     res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

        res.status(200).json(
            {
      message: "Login successful",
    }
          
     )
})