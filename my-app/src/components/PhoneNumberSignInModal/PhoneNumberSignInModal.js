import React, { useState } from 'react';
import './PhoneNumberSignInModal.css';
import { useDispatch, useSelector } from "react-redux";
import { getOTP,login } from '../../actions/auth';
const PhoneNumberSignInModal = ({ isOpen, onClose}) => {
  const [phoneNumber, setPhoneNumber] = useState('+91');
  const [otp, setOtp] = useState('');
  const [getOtp, setGetOtp] = useState(false);
  const dispatch = useDispatch();


  const handleSendOtp = async () => {
    console.log(phoneNumber);
    if(phoneNumber.length<10){
        alert("Please enter a valid number")
    }else{
        setGetOtp(true);
        dispatch(getOTP({phone:phoneNumber}))
        
    }
    // onSignIn(phoneNumber);
  };
  const handleVerifyOtp=async()=>{
    dispatch(login({phone:phoneNumber,otp:otp}))
    setPhoneNumber("");
    setOtp("");
    setGetOtp(false);
    onClose()
  }
  const HandleClose=()=>{
    setPhoneNumber("");
    setOtp("");
    setGetOtp(false);
    onClose()
  }

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <span className="close" onClick={HandleClose}>
          &times;
        </span>
        <h2>Sign In with Phone Number</h2>
        {
            getOtp?<label>Enter OTP:</label>:<label>Phone Number:</label>
        }
        
        {
            getOtp?<input type="text" minLength={4} maxLength={4} value={otp} onChange={(e) => setOtp(e.target.value)} />:<input type="tel" minLength={10} maxLength={13} value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        }
       {
        getOtp?<button onClick={handleVerifyOtp}>Verify OTP</button>:<button onClick={handleSendOtp}>Get OTP</button>
       }
       
      </div>
    </div>
  );
};

export default PhoneNumberSignInModal;
