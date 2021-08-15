import React, { useState } from "react";
// import { Link } from "react-router-dom";
import "./chat.css";

const Join = ({setNickname}) => {
  const [name, setName] = useState("");

  const handleJoinClick = (event) => {
      if(!name) {
        event.preventDefault()
      } else { 
        setNickname(name)
      }
  }

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div>
          <input
            placeholder="Name"
            className="joinInput"
            type="text"
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        {/* <div>
          <input
            placeholder="Room"
            className="joinInput mt-20"
            type="text"
            onChange={(event) => setRoom(event.target.value)}
          />
        </div> */}

        {/* <Link
          onClick={(event) => handleJoinClick(event)}
        > */}
          <button onClick={(event) => handleJoinClick(event)} className="button mt-20" type="submit">
            Sign In
          </button>
        {/* </Link> */}
      </div>
    </div>
  );
};

export default Join;
