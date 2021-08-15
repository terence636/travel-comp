import React from "react";
import "./chat.css";

const InfoBar = ({ nickname, room }) => {
  return (
    <div className="infoBar">
      <div className="leftInnerContainer">
        {/* <img className="onlineIcon" src="#" alt="online image" /> */}
        <h4>Room: {room.toUpperCase()}</h4>
      </div>
      <div className="rightInnerContainer">
        {/* <a href="/">
          <img src="#" alt="close image" />
        </a> */}
        <h4>{nickname.toUpperCase()}</h4>
      </div>
    </div>
  );
};

export default InfoBar;
