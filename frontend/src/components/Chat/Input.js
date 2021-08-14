import React from "react";
import "./chat.css";

const Input = ({setMsg, msg, sendMessage}) => (
  <from className="form">
    <input
      className="input"
      type="text"
      placeholder="Type a message"
      value={msg}
      onChange={(event) => setMsg(event.target.value)}
      onKeyPress={(event) =>
        event.key === "Enter" ? sendMessage(event) : null
      }
    />
    <buttton></buttton>
  </from>
);

export default Input;
