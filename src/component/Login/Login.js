import "./Login.css";
import React from "react";
import LoginImage from "../image/LoginImg.gif";

function Login() {
  return (
    <>
      <div className="div-login">
        <div>
          <img className="img-login" src={LoginImage} />
        </div>
        <div className="container-login">
          <p className="title-login">Login</p>
          <p className="parag-login">Please login below account detail</p>
          <form className="form-login">
            <input className="input-login" placeholder="User Name" />
            <input
              className="input-login"
              type="email"
              placeholder="Email"
            />
            <button className="btn-login">Sign in</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
