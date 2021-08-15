import React, { useRef } from "react";
import "./chat.css";

const Input = ({setMsg, msg, sendMessage}) => {
  const inputRef = useRef()

  const handleSend = (event) => {
    sendMessage(event,inputRef.current.value)
    inputRef.current.value = ''
  }

  return (
  <form className="form">
    <input
      className="input"
      type="text"
      placeholder="Type a message"
      ref={inputRef}
      // value={msg}
      // onChange={(event) => setMsg(event.target.value)}
      onKeyPress={(event) =>
        event.key === "Enter" ? handleSend(event) : null
      }
    />
  <button className="sendButton" onClick={(event)=>handleSend(event)}>Send</button>
  </form>
  )
   
};

export default Input;
