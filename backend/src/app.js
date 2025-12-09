import express from  'express'

const app = express();

app.get('/',(req,res)=>{
    res.send("Server is working well");
});

app.get("/api/v1/auth", )

 export default  app;