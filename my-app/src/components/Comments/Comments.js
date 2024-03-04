import React from 'react'

import "./comments.css";
import DisplayComments from '../Comments/DisplayComments'
import { useState,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { postComment } from "../../actions/comments";
const Comments = ({videoId}) => {
    const [commentText, setCommentText] = useState("");

    const CurrentUser = useSelector((state) => state?.currentUserReducer);
    const commentsList = useSelector((s) => s.commentReducer);
    const [Location, setLocation] = useState(null);
    const [formattedAddress, setFormattedAddress] = useState(null);
    // const commentsList = [
    //     {
    //     _id:"1",
    //     commentBody: "hello",
    //     userCommented: "abc",
    //     },
    //     {
    //     _id:"2",
    //     commentBody: "hiii",
    //     userCommented: "xyz",
    //     },
    // ];

    const dispatch = useDispatch();
  const handleOnSubmit = (e) => {
    e.preventDefault();
    handleLocationClick()
    if (CurrentUser) {
      if (!commentText) {
        alert("Plz Type your comment ! ");
      } else {
        dispatch(
          postComment({
            videoId: videoId,
            userId: CurrentUser?.result._id,
            commentBody: commentText,
            userCommented: CurrentUser?.result.name,
          })
        );
        setCommentText("");
      }
    }else{
      alert("Plz login to post your commnet !")
    }
  };
  function handleLocationClick() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Geolocation not supported");
    }
  }
   function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLocation({ latitude, longitude });
    
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    fetchapi()
    
  }
  const fetchapi=async ()=>{
   
    const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${Location.latitude}&lon=${Location.longitude}`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (response.ok) {
          setFormattedAddress(data.display_name);
        } else {
          console.log('Error fetching location data from OSM.');
        }
      } catch (error) {
        console.log('Error fetching location data.');
      }
    }
  
  function error() {
    console.log("Unable to retrieve your location");
  }

  return (
    <>
    <form className="comments_sub_form_comments" onSubmit={handleOnSubmit}>
      <input
        type="text"
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="add comment..."
        value={commentText}
        className="comment_ibox"
      />
      <input type="submit" value="add" className="comment_add_btn_comments" />
    </form>
    <div className="display_comment_container">
      {commentsList?.data
        ?.filter((q) => videoId === q?.videoId)
        .reverse()
        .map((m) => {
          return (
            <DisplayComments
              cId={m._id}
              userId={m.userId}
              commentBody={m.commentBody}
              commentOn={m.commentOn}
              userCommented={m.userCommented}
              formattedAddress={formattedAddress}
            />
          );
        })}
    </div>
  </>
  )
}

export default Comments