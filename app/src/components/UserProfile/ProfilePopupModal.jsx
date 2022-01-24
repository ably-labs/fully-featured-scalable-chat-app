import React from "react";
import "./profilepopupmodal.css";

// eslint-disable-next-line react/function-component-definition
export default function ProfilePopupModal(props) {
  return (
    <>
      <div className="modal">
        <div onClick={props.toggleModal} className="overlay"></div>
        <div className="modal-content">
          <img className="profile-img" src={props.profileImgUrl} alt={props.username} />
          <h2 className="popup-title"> {props.username}</h2>
          <p className="popup-subtitle">
            {props.firstName} {props.lastName}
          </p>
          <div className="popup-btns-section">
            <button className="popup-btn">Message</button>
            <button className="popup-btn">Other action</button>
          </div>
        </div>
      </div>
    </>
  );
}
