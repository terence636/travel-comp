import React, { useState } from "react";
import { Link } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas, faEye } from '@fortawesome/free-solid-svg-icons'
// import { faEyeSlash } from '@fortawesome/free-brand-svg-icons'
import '../../styles.css'

library.add(fas, faEye)



const Register = () => {
  const [pwdType, setPwdType] = useState('password')


  const handleEye = () => {
    pwdType === "password" ? setPwdType("text") : setPwdType("password")
  }

  return (
    <div className="container">
    <div className="wrapper">
      <section className="form signup">
        <header>Register</header>
        <form action="#">
          {/* <div className="error-txt">This is an error message!</div> */}
          {/* <div className="name-details">
            <div className="field input">
              <label>First Name</label>
              <input type="text" placeholder="First Name" />
            </div>
            <div className="field input">
              <label>Last Name</label>
              <input type="text" placeholder="Last Name" />
            </div>
          </div> */}
          <div className="field input">
              <label>Username</label>
              <input type="text" placeholder="Username" />
          </div>
          <div className="field input">
              <label>Email</label>
              <input type="text" placeholder="Enter new email" />
          </div>
          <div className="field input">
              <label>Password</label>
              <input type={pwdType} placeholder="Enter new password" />
              {pwdType === "password" && <FontAwesomeIcon className="eye" icon="eye" onClick={handleEye} />}
              {pwdType === "text" && <FontAwesomeIcon className="eye" icon="eye"  onClick={handleEye} />}
          </div>
          <div className="field image">
              <label>Select Image</label>
              <input type="file" />
          </div>
          <div className="field button1">
              <input type="submit" value="Sign Up" />
          </div>
          
        </form>
        <div className="link">
          Already signed up? <Link to="/login">Login Now</Link>
        </div>
      </section>
    </div>
    </div>
  );
};

export default Register;
