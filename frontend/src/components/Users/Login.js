import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Context } from "../../Main.js";
import '../../styles.css'
// import pic from './canoe.jpeg'



const Login = () => {
  const contextValue = useContext(Context);
  let history = useHistory();
  const [userNotFound, setUserNotFound] = useState(false)
  const [passwordWrong, setPasswordWrong] = useState(false)


  const handleLoginUser = (event) => {
    event.preventDefault();
    setUserNotFound(false)
    setPasswordWrong(false)
    const username = (event.target.username.value).toLowerCase();
    const password = event.target.elements.password.value;
    fetch("/sessions", {
      method: "POST",
      body: JSON.stringify({ username: username, password: password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        // console.log(res)
        if (res.status === 200) {
          return res.json();
        }
        else if(res.status === 409) {
          setUserNotFound(true)
        } else if (res.status === 401) {
          setPasswordWrong(true)
        }
      })
      .then((resJson) => {
        if (resJson) {
          contextValue.setLogState(resJson);
          history.push("/main")
        }
      }
      );
  };

  return (
    <div className="containerUser">
    {/* <img src={pic} alt="canoe" width="1000" height="600"/>   */}
    <div className="wrapperUser">
    
      <section className="formUser login">
        <header>Login</header>
        <form onSubmit={handleLoginUser}>
          {(userNotFound || passwordWrong) && <div className="error-txt">Invalid Username/Password!</div>}
          <div className="field input">
              <label>Username</label>
              <input type="text" name="username" placeholder="Enter your username" required/>
          </div>
          <div className="field input">
              <label>Password</label>
              <input type="password" name="password" placeholder="Enter new password" required/>
          </div>
          <div className="field button1">
              <input type="submit" value="Login" />
          </div>
        </form>
        <div className="link" >
          Not yet registered? <Link to="/register" style={{color:'blue'}}>Register Now</Link>
        </div>
      </section>
    </div>
    </div>
  );
};

export default Login;
