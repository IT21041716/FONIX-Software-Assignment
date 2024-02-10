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
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import {userRegister} from '../actions/authAction'

const Register = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const authenticated = useSelector(state => state.auth.authenticated)

  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [MobileNumber, setMobileNumber] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  useEffect(() => {
    if (loading === true) {
      toast.loading("Creating...", {
        id: "cheking",
      });
    } else if (loading === false) {
      toast.dismiss("cheking");
    }
  });

  const register = (e) => {

    e.preventDefault();

    if (FirstName === "") {
      toast.error("Please Provide An FirstName..!", {
        id: "FirstName",
      });
    } else if (LastName === "") {
      toast.error("Please Provide the LastName..!", {
        id: "'LastName'",
      });
    } else if (MobileNumber === "") {
      toast.error("Please Provide the MobileNumber..!", {
        id: "'MobileNumber'",
      });
    } else if (Email === "") {
      toast.error("Please Provide the Email..!", {
        id: "'Email'",
      });
    } else if (Password === "") {
      toast.error("Please Provide the Password..!", {
        id: "Password",
      });
    } else if (
      FirstName == "" &&
      LastName == "" &&
      MobileNumber == "" &&
      Email === "" &&
      Password === ""
    ) {
      toast.error("Please provide the Credentials...!", {
        id: "credential",
      });
    } else if (
      FirstName != "" &&
      LastName != "" &&
      MobileNumber != "" &&
      Email !== "" &&
      Password !== ""
    ) {
      const user = {
        FirstName,
        LastName,
        MobileNumber,
        Email,
        Password,
      };

      const log ={
        Email,
        Password,
      }


      dispatch(userRegister(user, log));
      setFirstName("")
      setLastName("")
      setMobileNumber("")
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
                    Create New User Account
                  </h5>

                  <MDBInput
                    wrapperClass="mb-4"
                    label="First Name"
                    id="formControlLg"
                    type="text"
                    size="lg"
                    value={FirstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Last Name"
                    id="formControlLg"
                    type="text"
                    size="lg"
                    value={LastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Mobile Number"
                    id="formControlLg"
                    type="text"
                    size="lg"
                    value={MobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                  />
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
                    onClick={register}
                  >
                    Login
                  </MDBBtn>
                  <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                    Already have an account?
                    <a href="/login" style={{ color: "#393f81" }}>
                      Login here
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

export default Register;
