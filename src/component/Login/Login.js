import "./Login.css";
import React, { useEffect, useState } from "react";
import LoginImage from "../image/LoginImg.gif";
import axios from "axios";
import { login } from "../../reducer/login/index";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Login() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);

  const dispatch = useDispatch();

  const state = useSelector((state) => {
    return {
      user: state.loginReducer.user,
      isLoggedIn: state.loginReducer.isLoggedIn,
    };
  });

  const navigate = useNavigate();

  const loginUsers = async (e) => {
    e.preventDefault();

    await axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        response.data.forEach((element) => {
          if (element.username == userName && element.email == email) {
            localStorage.setItem("user", JSON.stringify(element));
            dispatch(login(element));
            console.log(element);
            navigate("/home");
            setMessage("");
          } else if (
            (element.userName == userName && element.email != email) ||
            (element.userName != userName && element.email == email) ||
            (element.userName != userName && element.email != email)
          ) {
            setMessage("User Name or Email is incorrect");
          }
        });
      })
      .catch((error) => {});
  };

  return (
    <>
      <div className="div-login">
        <div>
          <img className="img-login" src={LoginImage} />
        </div>
        <div className="container-login">
          <p className="title-login">Login</p>
          <p className="parag-login">Please login below account detail</p>
          <form className="form-login" onSubmit={loginUsers}>
            <input
              className="input-login"
              placeholder="User Name"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
            <input
              className="input-login"
              type="email"
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <button className="btn-login">Sign in</button>
          </form>
          {message ? message && <div className="error-message">{message}</div> : <div></div>}
        </div>
      </div>
    </>
  );
}

export default Login;
