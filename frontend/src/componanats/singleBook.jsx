import React, { useEffect, useState } from "react";
import Header from "./header";
import Footer from "./footer";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "../actions/bookAction";
import { Navigate } from 'react-router-dom'
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
import { useParams, Link } from "react-router-dom";

const SingleBook = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.book.books.slice(0, 4));
  const [oneBook, setOneBook] = useState(null); // Initialize as null
  const { id } = useParams();

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  useEffect(() => {
    const foundBook = books.find((book) => book._id === id);
    if (foundBook !== oneBook) {
      setOneBook(foundBook);
    }
  }, [books, id, oneBook]);

  return (
    <>
      <Header />
      <div className="book-details-conatiner">
        {oneBook && (
          <>
            <div className="book-image">
              <img
                src={`http://localhost:5005/${oneBook.Book_image}`}
                alt="Book"
              />
            </div>
            <div className="book-details">
              <h1>{oneBook.Book_name}</h1>
              <h5>Author Name: {oneBook.Author}</h5>
              <h5>ISBN No: {oneBook.ISBN_No}</h5>
              <h5>Available Stock: {oneBook.Qty}</h5>
              <h5>Price: {oneBook.Price}</h5>
              <p>{oneBook.Description}</p>
            </div>
          </>
        )}
      </div>

      <div className="related-book">
        <h2>Related Books</h2>
        <div
          className="row justify-content-center"
          style={{ marginTop: "15px" }}
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

export default SingleBook;
