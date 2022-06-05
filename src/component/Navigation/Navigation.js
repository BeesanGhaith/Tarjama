import "./Navigation.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../reducer/login/index";

function Navigation() {
  const dispatch = useDispatch();

  const state = useSelector((state) => {
    return {
      user: state.loginReducer.user,
      isLoggedIn: state.loginReducer.isLoggedIn,
    };
  });

  useEffect(() => {
    console.log(state.user);
  });

  return (
    <>
      {state.isLoggedIn ? (
        <>
          <div className="div-navbar">
            <p>{state.user.name}</p>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default Navigation;
