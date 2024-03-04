// VideoPlayer.js
import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import {useParams } from "react-router-dom";
import 'video.js/dist/video-js.css';
import 'videojs-contrib-quality-levels';
import { useDispatch, useSelector } from "react-redux";
const VideoPlayer = () => {
  const qualities = ['144p','240p','320p','480p','720p','1080p'];
  const { vid } = useParams();
  const videoRef = useRef(null);
  const vids = useSelector((state) => state.videoReducer);
  const vv = vids?.data.filter((q) => q._id === vid)[0];
  const videoSrc=`http://localhost:5000/${vv?.filePath}`
  useEffect(() => {
    const player = videojs(videoRef.current, {
      controls: true,
      sources: [{ src: videoSrc, type: 'video/mp4' }],
    });
    
    player.qualityLevels();

    qualities.forEach((quality) => {
      player.src([{ src: videoSrc, type: 'video/mp4', res: quality }]);
    });

    return () => {
      if (player) {
        player.dispose();
      }
    };
  }, [videoSrc, qualities]);

  return (
    <div data-vjs-player>
      <video ref={videoRef} className="video-js" />
    </div>
  );
};

export default VideoPlayer;
