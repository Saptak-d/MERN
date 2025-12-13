import express from  'express'
import authRoute from "./routes/auth.routes.js"
import cookieParser from "cookie-parser";


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());


app.use("/api/v1/",authRoute)



app.get('/',(req,res)=>{
    res.send("Server is working well");
});




 export default  app; 