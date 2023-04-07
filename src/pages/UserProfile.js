import React from 'react';
import './UserProfile.css'
import Navbar from '../components/UI/Navbar'
import Post from "../components/post/post";
import { Posts } from "../dummyData";

const UserProfile = () => {
  return (
    <>
      <Navbar />
      <div className="user-profile">
        <div className="user-info">
          <img
            src={process.env.PUBLIC_URL + '/user.png'}
            alt="User avatar"
            className="avatar"
          />
          <h3 className="username">John Doe</h3>
          <p className="user-description">
            Agriculture enthusiast looking for an Agritech startup
          </p>
        </div>

        <div className="user-details">
          <div className="detail">
            <p className="detail-title">Location</p>
            <p className="detail-value">San Francisco, CA</p>
          </div>
          <div className="detail">
            <p className="detail-title">Email</p>
            <p className="detail-value">
              <a href='https://www.gmail.com' target='_blank'>example@gmail.com</a>
            </p>
          </div>
          <div className="detail">
            <p className="detail-title">Member since</p>
            <p className="detail-value">January 2020</p>
          </div>
        </div>
      </div>
      <div>
        <h3>Posts</h3>
        <div className="feed">
          <div className="feedWrapper">
            {/* <Share /> */}
            {Posts.map((p) => (
              <Post key={p.id} post={p} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
