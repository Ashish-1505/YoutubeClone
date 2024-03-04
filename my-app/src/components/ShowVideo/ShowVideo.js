import React, { useEffect } from 'react'
import './ShowVideo.css'
import {Link} from 'react-router-dom'
import moment from 'moment'
const ShowVideo = ({vid}) => {
  // console.log(vid);
  return (
    <>
     <Link to={`/videopage/${vid?._id}`}>
        <video 
        // src={`${vid.filePath}`}
        // src={`http://localhost:5000/${vid.filePath}`}
        src={`https://youtubeclonebackend.onrender.com/${vid?.filePath}`}
        // src={`https://youtube-clone-4mhr.onrender.com/${vid?.filePath}`}
        className="video_ShowVideo"
        />
     </Link>
     <div className='video_description'>
        <div className='Chanel_logo_App'>
            <div className='fstChar_logo_App'>
                <>{vid?.Uploder?.charAt(0).toUpperCase()}</>
            </div>
        </div>
        <div className='video_details'>
            <p className='title_vid_ShowVideo'>{vid?.videoTitle}</p>
            <pre className='vid_views_UploadTime'>{vid?.Uploder}</pre>
            <pre className='vid_views_UploadTime'>
                {vid?.Views} views <div className="dot"></div> {moment(vid?.createdAt).fromNow()}
            </pre>

        </div>
     </div>
    </>
  )
}

export default ShowVideo