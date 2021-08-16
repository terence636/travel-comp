import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import '../../styles.css'
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { fas, faEye } from '@fortawesome/free-solid-svg-icons'
// import { faEyeSlash } from '@fortawesome/free-brand-svg-icons'
// library.add(fas, faEye)


const Register = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [valid, setValid] = useState(true)
  const [errorMsg, setErrorMsg] = useState('This is an error message')

  const handleRegisterUser = (event) => {
    event.preventDefault();
    fetch("/users/register", {
      method: "POST",
      body: JSON.stringify({
        username: event.target.username.value,
        password: event.target.password.value,
        email: event.target.email.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        setIsSuccess(true);
        return res.json();
      } else if (res.status === 409) {
        setValid(false);
        setErrorMsg('Username Taken')
      }
    })
    .then((resJson) => {})
    .catch((error) => console.error({ Error: error }));
  }

  return (
    <div className="containerUser">
    <div className="wrapperUser">
      <section className="formUser signup">
        <header>Register</header>
        <form onSubmit={handleRegisterUser}>
          {!valid && <div className="error-txt">{errorMsg}</div>}
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
              <input type="text" name="username" placeholder="Enter new username" required/>
          </div>
          <div className="field input">
              <label>Email</label>
              <input type="text" name="email" placeholder="Enter new email" required/>
          </div>
          <div className="field input">
              <label>Password</label>
              <input type="password" name="password" placeholder="Enter new password" required/>
              {/* {pwdType === "password" && <FontAwesomeIcon className="eye" icon="eye" onClick={handleEye} />}
              {pwdType === "text" && <FontAwesomeIcon className="eye" icon="eye"  onClick={handleEye} />} */}
          </div>
          {/* <div className="field image">
              <label>Select Image</label>
              <input type="file" />
          </div> */}
          <div className="field button1">
              <input type="submit" value="Sign Up" />
          </div>
          
        </form>
        <div className="link">
          Already signed up? <Link to="/login" style={{color:'blue'}}>Login Now</Link>
        </div>
        {/* {!valid && <h3>Username Taken!</h3>} */}
        {isSuccess && <Redirect to="/login" />}
      </section>
    </div>
    </div>
  );
};

export default Register;
