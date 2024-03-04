import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email: {type:String},
    phone:{type:String},
    name: {type:String},
    desc:{type:String},
    joinedOn:{type:Date,default:Date.now},
    subscribers: [{ type: mongoose.Schema.Types.ObjectId }]
})
 
export default mongoose.model("User",userSchema)