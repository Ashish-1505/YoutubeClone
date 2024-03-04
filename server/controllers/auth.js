import jwt from "jsonwebtoken"
import  users from '../models/auth.js'
import Otp from '../models/Otp.js'
import bcrypt from 'bcryptjs';
import twilio from "twilio"
const accountSid = 'AC0f9d173374f9f78123ec9c7e4a27fa26';
const authToken = 'ce2f88fba387c6401495979b7ccc445b';
const client = new twilio(accountSid, authToken);

export const login = async(req,res)=>{
    const {email}=req.body;
    const {phone,otp}=req.body;
    try {
        if(email){
            const existingUser= await users.findOne({email});
            if(!existingUser){
                try {
                    const newUser= await users.create({email});

                    const token= jwt.sign({
                        email:newUser.email, id:newUser._id
                    },process.env.JWT_SECRET,{
                        expiresIn:"1h"
                    })
                    res.status(200).json({result:newUser,token})
                } catch (error) {
                    res.status(500).json({mess:"Something wents wrong..."});
                }
            }else{
                const token=jwt.sign({
                    email:existingUser.email, id:existingUser._id
                },process.env.JWT_SECRET,{
                    expiresIn:"1h"
                })
                res.status(200).json({result:existingUser,token})
            }
        }
        else if(phone){
            const existingUserByNumber= await users.findOne({phone});
            if(!existingUserByNumber){
                try {
                    const data=await Otp.findOne({phone})
                    const hashedOtp=data.otp
                    const validOtp=await bcrypt.compare(otp,hashedOtp)
                    if(validOtp){
                        const newUser= await users.create({phone});
                        const token= jwt.sign({
                            phone:newUser.phone, id:newUser._id
                        },process.env.JWT_SECRET,{
                            expiresIn:"1h"
                        })
                        await Otp.findOneAndDelete({phone})
                        res.status(200).json({result:newUser,token})
                    }
                    else{
                        res.status(500).json({mess:"Please enter the correct OTP..."});
                    }
                } catch (error) {
                    res.status(500).json({mess:"Something wents wrong..."});
                }
            }else{
                const data=await Otp.findOne({phone})
                const hashedOtp=data.otp
                const validOtp=await bcrypt.compare(otp,hashedOtp)
                if(validOtp){
                    const token=jwt.sign({
                        phone:existingUserByNumber.phone, id:existingUserByNumber._id
                    },process.env.JWT_SECRET,{
                        expiresIn:"1h"
                    })
                    await Otp.findOneAndDelete({phone})
                    res.status(200).json({result:existingUserByNumber,token})
                }else{
                    res.status(500).json({mess:"Please enter the correct OTP..."});
                }
            } 
        }
    } catch (error) {
        res.status(500).json({mess:"something wents wrong..."})
    }
}

export const getOtp= async (req,res)=>{
    try {
        const {phone}=req.body;
        const otp=`${Math.floor(1000+Math.random()*9000)}`
                    await client.messages.create({
                        body: `Your OTP is: ${otp}`, 
                        from: '+12055288356',
                        to: phone,
                    })
                const salt=10;
                const hashedOTP=await bcrypt.hash(otp,salt);

                const newOtpVerification=await new Otp({
                    phone:phone,
                    otp:hashedOTP,
                })
                await newOtpVerification.save()
                res.status(200).json({mess:"otp sent successfully..."})
    } catch (error) {
        res.status(500).json({mess:"something wents wrong..."})
    }
}
export const subscribe=async(req,res)=>{
  const { UploaderId } = req.body;
  const { userId } = req.body;
  try {
    const creator = await users.findByIdAndUpdate(UploaderId, { $addToSet: { subscribers: userId } }, { new: true })
    res.json({ success: true, creator });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
} 
  
export const unSubscribe=async(req,res)=>{
    const { UploaderId } = req.body;
    const { userId } = req.body;
    try {
      const creator = await users.findByIdAndUpdate(UploaderId, { $pull: { subscribers: userId } }, { new: true })
      res.json({ success: true, creator });
    } catch (error) { 
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  export const checkAlreadySubscribed=async(req,res)=>{
    const { _id, userId } = req.query;
    try {
        const user = await users.findById({_id});
        // console.log(user);
        if(user.subscribers.includes(userId)){
            res.json({success:true}); 
        }else{
            res.json({success:false}); 
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
  } 