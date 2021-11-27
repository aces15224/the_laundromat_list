import React, { Component } from 'react';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/SignUp";


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path = "/login" element={<LoginPage/>} />
          <Route exact path = "/sign-up" element={<SignUpPage/>} />
        </Routes>
      </BrowserRouter>   
    );
  }
}

export default App;