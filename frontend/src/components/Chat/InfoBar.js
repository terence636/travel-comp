import React from "react";
import "./chat.css";

const InfoBar = ({ nickname, room }) => {
  return (
    <div className="infoBar">
      <div className="leftInnerContainer">
        <h4>Room: {room.toUpperCase()}</h4>
      </div>
      <div className="rightInnerContainer">
 
        <h4>{nickname.toUpperCase()}</h4>
      </div>
    </div>
  );
};

export default InfoBar;
