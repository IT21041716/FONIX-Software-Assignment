import React, { useEffect } from "react";
import {
  MDBCarousel,
  MDBCarouselItem,
  MDBCarouselCaption,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";
import Header from "./header";
import Footer from "./footer";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getBooks } from "../actions/bookAction";
import { Link } from "react-router-dom";
const Home = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.book.loading);
  const books = useSelector((state) => state.book.books);


  useEffect(() => {
    if (loading === true) {
      toast.loading("Loading...", {
        id: "loading",
      });
    } else if (loading === false) {
      toast.dismiss("loading");
    }
  });

  useEffect(() => {
    dispatch(getBooks());
  }, []);

  return (
    <>
      <Header />

      <MDBCarousel showIndicators showControls fade>
        <MDBCarouselItem itemId={1}>
          <img
            src="../../public/1.jpg"
            className="d-block w-100"
            alt="..."
            id="carousal-img"
          />
          <MDBCarouselCaption>
            <h2>First slide label</h2>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </MDBCarouselCaption>
        </MDBCarouselItem>

        <MDBCarouselItem itemId={2}>
          <img
            src="../../public/2.jpg"
            className="d-block w-100"
            alt="..."
            id="carousal-img"
          />
          <MDBCarouselCaption>
            <h2>Second slide label</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </MDBCarouselCaption>
        </MDBCarouselItem>

        <MDBCarouselItem itemId={3}>
          <img
            src="../../public/3.jpg"
            className="d-block w-100"
            alt="..."
            id="carousal-img"
          />
          <MDBCarouselCaption>
            <h2>Third slide label</h2>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </MDBCarouselCaption>
        </MDBCarouselItem>
        <MDBCarouselItem itemId={4}>
          <img
            src="../../public/4.jpg"
            className="d-block w-100"
            alt="..."
            id="carousal-img"
          />
          <MDBCarouselCaption>
            <h2>Third slide label</h2>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </MDBCarouselCaption>
        </MDBCarouselItem>
      </MDBCarousel>

      <div className="book-list-container">
        <h2>Book List</h2>
        <p className="book-p">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
        <div
          className="row justify-content-center"
          style={{
            marginTop: "15px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {books.map((data, index) => (
            <div className="col-lg-3 col-md-12 mb-4" key={index}>
              <MDBCard id="mdb-card">
                <MDBCardImage
                  src={`http://localhost:5005/${data.Book_image}`}
                  position="top"
                  alt="..."
                />
                <MDBCardBody>
                  <MDBCardTitle>{data.Book_name}</MDBCardTitle>
                  <MDBCardText>{data.Author}</MDBCardText>
                  <Link to={`/book/${data._id}`}>
                    <MDBBtn>Button</MDBBtn>
                  </Link>
                </MDBCardBody>
              </MDBCard>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
