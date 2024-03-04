import mongoose from "mongoose";

const Otp=new mongoose.Schema({
    phone:{type:String},
    otp:{type:String}
}) 


export default mongoose.model('Otp',Otp)