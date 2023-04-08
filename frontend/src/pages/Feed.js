import React, {useContext, useEffect, useRef,useState} from "react";
import feedContext from "../context/feedContext";
import Post from "../components/post/post";
// import Share from "../share/Share";
import "./Feed.css";
import { Posts } from "../dummyData";
import {useNavigate} from "react-router-dom";
export default function Feed(props) {
  let navigate=useNavigate();
  // const {showAlert}=props;
    const context=useContext(feedContext);
    const {feeds,getFeeds,editFeed}=context;
    useEffect(()=>{
      if(localStorage.getItem('token')){
        getFeeds()
      }
       else{
        navigate("/login");
       }
        //eslint-disable-next-line
    },[])
  return (
    <div className="feed">
      <div className="feedWrapper">
        {/* <Share /> */}
        {Posts.map((p) => (
          <Post key={p.id} post={p} />
        ))}
      </div>
    </div>
  );
}