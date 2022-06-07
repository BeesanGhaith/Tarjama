import "./App.css";
import React, { useState } from "react";
import { Routes, Route, useRoutes } from "react-router-dom";
import Login from "./component/Login/Login";
import Home from "./component/Home/Home";
import Navigation from "./component/Navigation/Navigation";
import Profile from "./component/Profile/Profile";
import Users from "./component/Users/Users";

function App() {
  const [profile, setProfile] = useState();
  return (
    <div className="App">
      <Navigation profile={profile}/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </div>
  );
}

export default App;
