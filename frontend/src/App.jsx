import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "../public/styles/main.css";
import "../public/styles/responsive.css";
import "./App.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { isLoggedIn } from "./actions/authAction";
import { useDispatch, useSelector } from "react-redux";

//customize pages
import Home from "./componanats/home";
import Login from "./componanats/login";
import Register from "./componanats/register";
import BookDetails from "./componanats/singleBook";
import Admin from "./componanats/displayBook";

function App() {
  const dispatch = useDispatch();
  const authenticated = useSelector((state) => state.auth.authenticated);
  

  useEffect(() => {
    if (!authenticated) {
      dispatch(isLoggedIn());
    }
  }, []);
  return (
    <>
      <Toaster position="top-center" reverseOrder={true} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
