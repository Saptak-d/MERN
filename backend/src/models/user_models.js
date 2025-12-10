import mongoose from "mongoose";
import { Schema } from "mongoose";
import bcrypt from "bcrypt"

 const userSchema = new Schema({
    username : {
        required :true,
         type : String ,
         unique : true,
          lowercase : true,
         trim : true,
    },
    password :{
         type: String,
        required :[ true ,"password is mandatory"],
         minlength : 4,
         maxlength : 10,
    },
    email :{
         type: String,
        required : true,
        unique : true,
        lowercase : true,
    },
    isEmailVerified :{
         type : Boolean,
         default :false
    },

},{timestamps:true});

 userSchema.pre("save", async function (next) {
    if(!this.isModified("password")){
        return ;
    }
    this.password = await bcrypt.hash(this.password,10)
    return;
 });

  userSchema.methods.ispasswordisCorrect = async function (password) {
    return  bcrypt.compare(password,this.password);
  }




 export const User = mongoose.model("User",userSchema);