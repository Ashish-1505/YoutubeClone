import React,{useState,useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import './Navbar.css'
import {IoMdNotificationsOutline} from 'react-icons/io'
import logo from './logo.png'
import SearchBar from '../SearchBar/SearchBar'
import {RiVideoAddLine} from 'react-icons/ri'
import {BiUserCircle} from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { login} from "../../actions/auth";
import Auth from "../../Pages/Auth/Auth";
import PhoneNumberSignInModal from '../PhoneNumberSignInModal/PhoneNumberSignInModal';
const Navbar = ( { toggleDrawer,setEditCreateChanelBtn }) => {
  const [AuthBtn, setAuthBtn] = useState(false)
  const CurrentUser=useSelector(state=>state.currentUserReducer)
  const [phoneNumberModalOpen, setPhoneNumberModalOpen] = useState(false);
  // const CurrentUser = null;
  //   const CurrentUser = {
  //   result: {
  //     email: "abzxy50312@gmail.com",
  //     joinedOn: "2222-07-15T09:57:23.489Z",
  //   },
  // };
  // console.log(CurrentUser)
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId:
          "873521087604-32mt3sbuad1cn9ro8prqu8i4ejakbu0i.apps.googleusercontent.com",
        scope: "email",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  const dispatch = useDispatch();
  // const logTmp=()=>{
  //   dispatch(login({ email:"abzxy50312@gmail.com" }));
  // }
  const onSuccess = (response) => {
    const Email = response?.profileObj.email;
    console.log(Email);
    dispatch(login({ email: Email }));
  };

  const onFailure = (response) => {
    console.log("Failed", response);
  };
  return (
    <>
    <div className='container-navbar'>
        <div className='logo_navbar'>
            <div className='burger' onClick={()=>toggleDrawer()}>
                <p></p>
                <p></p>
                <p></p>
            </div>
            <Link to={'/'} className='logo-div'>
                <img src={logo} alt=''/>
                <p className='logo-title'>YouTube</p>
            </Link>
            
        </div>
      <SearchBar/>
      <RiVideoAddLine  size={22} className='vid-bell-Navbar'/>
     
      <div className='apps_Box'>
        <p className='appBox'></p>
        <p className='appBox'></p>
        <p className='appBox'></p>
        <p className='appBox'></p>
        <p className='appBox'></p>
        <p className='appBox'></p>
        <p className='appBox'></p>
        <p className='appBox'></p>
        <p className='appBox'></p>
      </div>
      <IoMdNotificationsOutline   size={22}  className='vid-bell-Navbar'/>
      <div className="Auth_cont_Navbar">
        {CurrentUser ? (
          <>
            <div className="Chanel_logo_App" onClick={()=>setAuthBtn(true)}>
              {
                CurrentUser?.result.phone?(<p className="fstChar_logo_App">
                {(CurrentUser?.result.name ) ? (
                  <>{CurrentUser?.result.name.charAt(0).toUpperCase()}</>
                ) : (
                  <>PH</>
                )
                }
              </p>):(
                  <p className="fstChar_logo_App">
                    {(CurrentUser?.result.name ) ? (
                      <>{CurrentUser?.result.name.charAt(0).toUpperCase()}</>
                    ) : (
                      <>{CurrentUser?.result.email.charAt(0).toUpperCase()}</>
                    )
                    }
                  </p>
                )
              }


              
            </div>
          </>
        ) : (
          <>
            <GoogleLogin
              clientId={
                "873521087604-32mt3sbuad1cn9ro8prqu8i4ejakbu0i.apps.googleusercontent.com"
              }
              onSuccess={onSuccess}
              onFailure={onFailure}
              render={(renderProps) => (
                <p onClick={renderProps.onClick} className="Auth_Btn">
                {/* <p onClick={logTmp} className="Auth_Btn"> */}
                  <BiUserCircle size={22} />
                  <b>Sign in</b>
                </p>
               )}
             />
             <p className="Auth_Btn" style={{marginLeft: "1rem"}} onClick={()=>setPhoneNumberModalOpen(true)}>
                  <BiUserCircle size={22} />
                  <b>Sign in with Phone Number</b>
             </p>
             <PhoneNumberSignInModal
              isOpen={phoneNumberModalOpen}
              onClose={() => setPhoneNumberModalOpen(false)}
            />
          </>
        )}
      </div>
    </div>
    {
      AuthBtn &&
      <Auth
      setEditCreateChanelBtn={setEditCreateChanelBtn}
      setAuthBtn={setAuthBtn}
      User={CurrentUser}
      />
    }
    </>
  )
}

export default Navbar