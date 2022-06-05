import "./App.css";
import React, { useState } from "react";
import { Routes, Route, useRoutes } from "react-router-dom";
import Login from "./component/Login/Login";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
