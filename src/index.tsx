import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "antd/dist/antd.css";
import Login from "./pages/login";
import Todo from "./pages/todo";
import Redirect from "./pages/redirect";
import Home from "./pages/home";
import Calculator from "./components/calculator";

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Routes>
        <Route path="/" element={<Redirect />} />
        <Route path="/home/*" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
