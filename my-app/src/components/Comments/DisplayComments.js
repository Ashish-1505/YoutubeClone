import React from 'react'
import { useState,useEffect } from "react";
import "./comments.css";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment, editComment } from "../../actions/comments";

const DisplayComments = ({cId,
  commentBody,
  userId,
  commentOn,
  userCommented,formattedAddress}) => {
  const [Edit, setEdit] = useState(false);
  const [cmtBdy, setcmtBdy] = useState("");
  const [cmtId, setcmtId] = useState("");

  const CurrentUser = useSelector((state) => state?.currentUserReducer);

  const handleEdit = (ctId, ctBdy) => {
    setEdit(true);
    setcmtId(ctId);
    setcmtBdy(ctBdy);
  };

  const dispatch = useDispatch();
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!cmtBdy) {
      alert("Type Your comments");
    } else {
      dispatch(
        editComment({
          id: cmtId,
          commentBody: cmtBdy,
        })
      );
      setcmtBdy("");
    }
    setEdit(false);
  };
  const handleDel=(id)=>{
    dispatch(deleteComment(id))
  }

 


  return (
    <>
      {Edit ? (
        <>
          <form
            className="comments_sub_form_comments"
            onSubmit={handleOnSubmit}
          >
            <input
              type="text"
              onChange={(e) => setcmtBdy(e.target.value)}
              placeholder="Edit comment..."
              value={cmtBdy}
              className="comment_ibox"
            />
            <input
              type="submit"
              value="Change"
              className="comment_add_btn_comments"
            />
          </form>
        </>
      ) : (
        <p className="comment_body">{commentBody}</p>
      )}
      <p className="usercommented">
        {" "}
        - {userCommented} commented {moment(commentOn).fromNow()}

          {" "}User location: {formattedAddress}
      </p>
      {CurrentUser?.result._id === userId && (
        <p className="EditDel_DisplayCommendt">
          <i onClick={() => handleEdit(cId, commentBody)}>Edit</i>
          <i onClick={()=> handleDel(cId)} >Delete</i>
        </p>
      )}
    </>
  )
}

export default DisplayComments