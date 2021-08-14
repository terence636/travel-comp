import React, { useState } from "react";
import { Link } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye} from '@fortawesome/free-solid-svg-icons'
import '../../styles.css'

library.add(faEye)

const Login = () => {
  const [pwdType, setPwdType] = useState('password')


  const handleEye = () => {
    pwdType === "password" ? setPwdType("text") : setPwdType("password")
  }


  return (
    <div className="container">
    <div className="wrapper">
      <section className="form login">
        <header>Login</header>
        <form action="/main">
          <div className="error-txt" hidden>This is an error message!</div>
          <div className="field input">
              <label>Username</label>
              <input type="text" placeholder="Enter your username" />
          </div>
          <div className="field input">
              <label>Password</label>
              <input type={pwdType} placeholder="Enter new password" />
              <FontAwesomeIcon className="eye" icon="eye"  onClick={handleEye}/>
          </div>
          <div className="invisible">
              <input type="checkbox" name="invisible" value="invisible"/>
              <label>  Invisible</label>
          </div>
          <div className="field button1">
              <input type="submit" value="Login" />
          </div>
          
        </form>
        <div className="link">
          Not yet registered? <Link to="/register">Register Now</Link>
        </div>
      </section>
    </div>
    </div>
  );
};

export default Login;
