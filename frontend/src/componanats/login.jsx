import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { userLogin } from "../actions/authAction";


const Login = () => {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const authenticating = useSelector(state => state.auth.authenticating)
  const authenticated = useSelector(state => state.auth.authenticated)



  useEffect(() => {
    if (authenticating === true) {
      toast.loading("Cheking...", {
        id: "cheking",
      });
    } else if (authenticating === false) {
      toast.dismiss("cheking");
    }
  });

  const login = (e) => {
    e.preventDefault();

    if (Email === "") {
      toast.error("Please Provide An Email..!", {
        id: "email",
      });
    } else if (Password === "") {
      toast.error("Please Provide the Password..!", {
        id: "'password'",
      });
    } else if (Email === "" && Password === "") {
      toast.error("Please provide the Credentials...!", {
        id: "credential",
      });
    } else if (Email !== "" && Password !== "") {
      const user = {
        Email,
        Password,
      };

      dispatch(userLogin(user));
      setEmail("");
      setPassword("");
    }
  };

  if (authenticated) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className="login-container">
        <MDBContainer className="my-5" style={{ height: "90vh" }}>
          <MDBCard>
            <MDBRow className="g-0">
              <MDBCol md="6">
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                  alt="login form"
                  className="rounded-start w-100"
                  style={{ height: "80vh", objectFit: "cover" }}
                />
              </MDBCol>

              <MDBCol md="6">
                <MDBCardBody className="d-flex flex-column">
                  <div className="d-flex flex-row mt-2">
                  <a href="/">
                    <img
                      src="../../public/book1.png"
                      style={{ width: "50%", height: "auto" }}
                      
                    /></a>
                  </div>

                  <h5
                    className="fw-normal my-4 pb-3"
                    style={{ letterSpacing: "1px" }}
                  >
                    Sign into your account
                  </h5>

                  <MDBInput
                    wrapperClass="mb-4"
                    label="Email address"
                    id="formControlLg"
                    type="email"
                    size="lg"
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Password"
                    id="formControlLg"
                    type="password"
                    size="lg"
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <MDBBtn
                    className="mb-4 px-5"
                    color="dark"
                    size="lg"
                    onClick={login}
                  >
                    Login
                  </MDBBtn>
                  <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                    Don't have an account?
                    <a href="/register" style={{ color: "#393f81" }}>
                      Register here
                    </a>
                  </p>
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBContainer>
      </div>
    </>
  );
};

export default Login;
