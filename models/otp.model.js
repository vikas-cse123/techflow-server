import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    otp:{
        type:String,
        required:true,
        match: [/^\d{6}$/],
 
    },
     email: {
      type: String,
      required:true,
      unique: true,
      maxLength: 255,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/]
    },
    createdAt:{
        type:Date,
        default:Date.now, 
        expires:300
    }
})



const Otp = mongoose.model("otp",otpSchema)
export default Otp