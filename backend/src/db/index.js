import mongoose from 'mongoose'



const connectDB  = async function() {
    
  try{
    
       await   mongoose.connect(process.env.DBURL)
       console.log("Data base is connected ");
  }
  catch(err){

    console.error("DB connection faild ",err)
            process.exit();
  }

}

export default connectDB ;