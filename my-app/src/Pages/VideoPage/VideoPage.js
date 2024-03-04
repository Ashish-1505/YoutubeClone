
import React ,{useEffect, useState}from 'react'
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import axios from "axios"
import "./VideoPage.css";
import vid from "../../components/Video/vid.mp4";
import LikeWatchLaterSaveBtns from './LikeWatchLaterSaveBtns';
import Comments from '../../components/Comments/Comments';
import { useDispatch, useSelector } from "react-redux";

import { addToHistory } from "../../actions/History";
import { viewVideo } from "../../actions/video";  
import VideoPlayer from './VideoPlayer';
import {subscribe,unSubscribe} from "../../actions/auth"
import { login } from '../../api';

const VideoPage = () => {
  const { vid } = useParams();
  // const chanels = useSelector((state) => state?.chanelReducers);

  // console.log(Cid)
  // const currentChanel = chanels.filter((c) => c._id === vid)[0];

  const vids = useSelector((state) => state.videoReducer);
  // console.log(vids)
  const vv = vids?.data.filter((q) => q._id === vid)[0];
  const dispatch = useDispatch();
  const CurrentUser = useSelector((state) => state?.currentUserReducer);
  const [Subscribe,setSubscribe]=useState(false)
  const [checkSub,setCheckSub]=useState({})


  const handleHistory = () => {
    dispatch(
      addToHistory({
        videoId: vid,
        Viewer: CurrentUser?.result._id,
      })
    );
  };
  const handleViews=()=>{
    dispatch(viewVideo({
      id:vid
    }))
  }
  useEffect(() => {
    if (CurrentUser) {
      checkSubscribe();
      handleHistory();
    }
    handleViews();
  }, []); 

  
  const checkSubscribe=async()=>{
    try {
      const {data}=await axios.get("/user/checkSubscribe",{
        params: {
          _id: vv.videoChanel,
          userId: CurrentUser?.result._id,
        },
      })
      if(data.success===true){
        // console.log(data.success);
        setSubscribe(true)
      }
    } catch (error) {
      alert(error)
    }
  } 
  const handleSubscribeClicked=()=>{
       if(Subscribe){
        setSubscribe(false) 
        dispatch(unSubscribe({
          UploaderId:vv?.videoChanel,
          userId:CurrentUser?.result._id
        }))
       }else{ 
        setSubscribe(true)
        dispatch(subscribe({ 
          UploaderId:vv?.videoChanel,
          userId:CurrentUser?.result._id
        }))
       }
  }
 
  return (
    <>
      <div className="container_videoPage">
        <div className="container2_videoPage">
          <div className="video_display_screen_videoPage">
            {Subscribe?<video
              src={`http://localhost:5000/${vv?.filePath}`}
              // src={`https://youtube-clone-4mhr.onrender.com/${vv?.filePath}`}
              // src={vid}
              className={"video_ShowVideo_videoPage"}
              controls
              autoPlay
            ></video>:<div>
            <p>Video restricted to subscribers only</p>
            <div style={{ width: '100%', height: '400px', backgroundColor: '#ccc' }}></div>
          </div>}
            {/* <VideoPlayer/> */}
            <div className="video_details_videoPage">
              <div className="video_btns_title_VideoPage_cont">
                <p className="video_title_VideoPage"> {vv?.videoTitle}</p>
                <div className="views_date_btns_VideoPage">
                  <div className="views_videoPage">
                    {vv?.Views} views <div className="dot"></div>{" "}
                    {moment(vv?.createdAt).fromNow()}
                  </div>
                  <LikeWatchLaterSaveBtns vv={vv} vid={vid}/>
                </div>
              </div>
              <div className='chanel_data'>
                <Link
                  to={`/chanel/${vv?.videoChanel}`}
                  className="chanel_details_videoPage"
                >
                  <b className="chanel_logo_videoPage">
                    <p>{vv?.Uploder.charAt(0).toUpperCase()}</p>
                  </b>
                  <p className="chanel_name_videoPage">{vv?.Uploder}</p>
                </Link>
                <button className={Subscribe?'subs_button_clicked':'subs_button'} onClick={handleSubscribeClicked}>{Subscribe?"Subscribed":"Subscribe"}</button>
              </div>
              
           {Subscribe?<div className="comments_VideoPage">
                <h2>
                  <u>Coments</u>
                </h2>
                <Comments videoId={vv._id}/>
              </div>:<></>}
            </div>
          </div>
          <div className="moreVideoBar">More video</div>
        </div>
      </div>
    </>
  )
}

export default VideoPage