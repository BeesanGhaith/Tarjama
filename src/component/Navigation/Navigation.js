import "./Navigation.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../reducer/login/index";
import { useNavigate } from "react-router-dom";
import { BiUserPin } from "react-icons/bi";
import { MdLogout } from "react-icons/md";
import { GoHome } from "react-icons/go";


function Navigation() {
  const dispatch = useDispatch();

  const state = useSelector((state) => {
    return {
      user: state.loginReducer.user,
      isLoggedIn: state.loginReducer.isLoggedIn,
    };
  });

  const navigate = useNavigate();

  const logoutUser = () => {
    dispatch(logout());
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      {state.isLoggedIn ? (
        <>
          <div className="div-navbar">
            <div><GoHome className="home-icon"/>
            <h2
              className="home"
              onClick={() => {
                navigate("/home");
              }}
            >
              Home
            </h2></div>
            <div>
                <BiUserPin className="user-icon"/>
                <h2
                  className="name"
                  onClick={() => {
                    navigate("/profile");
                  }}
                >
                  {state.user.name}
                </h2>
                <MdLogout className="logout-icon"/>
              <h2 className="logout" onClick={logoutUser}>
                LogOut
              </h2>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default Navigation;
