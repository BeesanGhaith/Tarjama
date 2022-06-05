import "./App.css";
import React, { useState } from "react";
import { Routes, Route, useRoutes } from "react-router-dom";
import Login from "./component/Login/Login";
import Home from "./component/Home/Home";
import Navigation from "./component/Navigation/Navigation";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
