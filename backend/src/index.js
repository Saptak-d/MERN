import app from "./app.js"
import connectDB from "./db/index.js";

import dotenv from "dotenv"

dotenv.config({
    path : "../.env"
})
const port = process.env.port || 3000;

 connectDB()
 .then(res=>{
     app.listen(port,()=>{
        console.log("Server is running ")
     })
 })
 .catch(err=>[
    console.log("Server is faild to running,",err)
 ])




