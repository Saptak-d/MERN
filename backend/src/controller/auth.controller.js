
import mongoose from "mongoose";
import { User } from "../models/user_models.js";

export const register  = async(req,res)=>{


    console.log("METHOD:", req.method);
  console.log("URL:", req.originalUrl);
  console.log("HEADERS:", req.headers["content-type"]);
  console.log("BODY:", req.body);
    
 try {

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
    }catch (err){

        return res.status(404).json({
                message : err.message,
        
        })
    }  
}

export const LoginUser = async(req,res)=>{

  try{
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
            throw new Error("your passsword is not correct ")
          }

          const  loginuser  =  await User.findOne({ _id: user._id }).select("-password -isEmailVerified");

        res.status(200).json(
            {
      message: "Login successful",
      user: loginuser,
    }
          
     )
  }catch (err){
        res.status(400).json({
            message : err.message
        })
  }

}