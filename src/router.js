import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

import SigninScreen from "./screen/signin.js";
import DashboardScreen from "./screen/dashboard.js";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SigninScreen />} />
        <Route exact path="/signin" element={<SigninScreen />} />
        <Route exact path="/signup" element={<SigninScreen />} />
        <Route exact path="/dashboard" element={<DashboardScreen />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
