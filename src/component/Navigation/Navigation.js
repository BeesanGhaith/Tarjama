import "./Navigation.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../reducer/login/index";
import { useNavigate } from "react-router-dom";

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
  }



  return (
    <>
      {state.isLoggedIn ? (
        <>
          <div className="div-navbar">
            <h2 className="name">{state.user.name}</h2>
            <h2 className="logout" onClick={logoutUser}>LogOut</h2>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default Navigation;
