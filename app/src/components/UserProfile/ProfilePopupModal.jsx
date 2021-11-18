import React from "react";
import "./profilepopupmodal.css";

export default function ProfilePopupModal(props) {
  return (
    <>
      <div className="modal">
        <div onClick={props.toggleModal} className="overlay"></div>
        <div className="modal-content">
          <img className="profile-img" src={props.profileImgUrl} alt={props.username} />
          <h2 class="popup-title"> {props.username}</h2>
          <p class="popup-subtitle">
            {props.firstName} {props.lastName}
          </p>
          <div class="popup-btns-section">
            <button className="popup-btn">Message</button>
            <button className="popup-btn">Other action</button>
          </div>
        </div>
      </div>
    </>
  );
}
