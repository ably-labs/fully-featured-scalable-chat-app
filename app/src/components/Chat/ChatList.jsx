import React, { useState } from "react";
import { useAuth } from "../../AppProviders";
import ProfilePopupModal from "../UserProfile/ProfilePopupModal";

export const ChatList = ({ history }) => {
  const { api } = useAuth();
  const [modal, setModal] = useState(false);
  const [userProfileDetails, setUserProfileDetails] = useState({});

  const messageElements = history.map((item, index) => {
    const [userId, username, encodedProfileImgUrl] = item.clientId.split(":");
    const profileImgUrl = decodeURIComponent(encodedProfileImgUrl);
    const messageTime = new Date(item.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const getUserProfileDetails = async () => {
      const response = await api.getUserProfile(userId);
      setUserProfileDetails(response);
      toggleProfileModal();
    };

    const toggleProfileModal = () => {
      setModal(!modal);
    };

    return (
      <li key={index} className="message">
        {modal && (
          <ProfilePopupModal
            username={userProfileDetails.username}
            firstName={userProfileDetails.firstName}
            lastName={userProfileDetails.lastName}
            profileImgUrl={userProfileDetails.profileImgUrl}
            toggleModal={toggleProfileModal}
          />
        )}
        <img className="message-thumbnail" src={profileImgUrl} alt={username} onClick={getUserProfileDetails} />
        <span className="message-header">
          <span className="sender" onClick={getUserProfileDetails}>
            {username}
          </span>
          <span className="time">{messageTime}</span>
        </span>
        <span className="text">{item.data.text}</span>
      </li>
    );
  });

  return messageElements;
};

export default ChatList;
