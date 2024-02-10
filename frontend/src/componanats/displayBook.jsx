import React, { useEffect, useState } from "react";
import { MDBTooltip } from "mdb-react-ui-kit";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Header from "./header";
import Footer from "./footer";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  getBooks,
  upgradeBook,
  bookdelete,
  AddBook,
} from "../actions/bookAction";
import Swal from "sweetalert2";
import { Table, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import toast from "react-hot-toast";


const Admin = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.book.loading);
  const books = useSelector((state) => state.book.books);
  const authenticated = useSelector(state => state.auth.authenticated)

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

  const deleteBook = (id) => {
    Swal.fire({
      title: "Are you sure want to Delete this Book?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#008000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
      cancelButtonText: "No!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(bookdelete(id));
      }
    });
  };

  const [shDataModel, setShDataModel] = useState(false);
  const [datas, setDatas] = useState("");

  const DataModelShow = (data) => {
    setShDataModel(true);
    setDatas(data);
  };

  const DataModelClose = (e) => {
    setShDataModel(false);
  };
  const DisplayModel = () => {
    return (
      <Modal show={shDataModel} onHide={DataModelClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Book Details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="modal-style">
            <Col md={6}>
              <label style={{ fontSize: "18px", fontWeight: "600" }}>
                ISBN No
              </label>
              <p className="ptags">{datas.ISBN_No} </p>
            </Col>
            <Col md={6}>
              <label style={{ fontSize: "18px", fontWeight: "600" }}>
                Author
              </label>
              <p className="ptags">{datas.Author}</p>
            </Col>
          </div>
          <div className="modal-style">
            <Col md={12}>
              <label style={{ fontSize: "18px", fontWeight: "600" }}>
                Book Title
              </label>
              <p className="ptags">{datas.Book_name} </p>
            </Col>
          </div>
          <div className="modal-style">
            <Col md={6}>
              <label style={{ fontSize: "18px", fontWeight: "600" }}>
                Price
              </label>
              <p className="ptags">{datas.Price} </p>
            </Col>
            <Col md={6}>
              <label style={{ fontSize: "18px", fontWeight: "600" }}>
                Quantity
              </label>
              <p className="ptags">{datas.Qty}</p>
            </Col>
          </div>
          <div className="modal-style">
            <Col md={12}>
              <label style={{ fontSize: "18px", fontWeight: "600" }}>
                Description
              </label>
              <p style={{ maxWidth: "100%", overflowWrap: "break-word" }}>
                {datas.Description}{" "}
              </p>
            </Col>
          </div>
          <div className="modal-style">
            <Col md={12}>
              <label style={{ fontSize: "18px", fontWeight: "600" }}>
                Book Cover Image
              </label>
              <img
                src={`http://localhost:5005/${datas.Book_image}`}
                className="image-single"
              />
            </Col>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={DataModelClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const [shAddModel, setShAddModel] = useState(false);
  const [isbn, setIsbn] = useState("");
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [qty, setQty] = useState("");
  const [price, setPrice] = useState("");
  const [Picture, setPicture] = useState("");
  const [id, setId] = useState("");
  const AddModelShow = () => {
    setShAddModel(true);
  };

  const AddModelClose = (e) => {
    setShAddModel(false);
  };

  const handleImageChange = (e) => {
    setPicture(e.target.files[0]);
  };

  const sendData = () => {
    if (isbn === "") {
      toast.error("ISBN number required..!");
    } else if (name === "") {
      toast.error("Book title is required..!");
    } else if (author === "") {
      toast.error("Author required..!");
    } else if (description === "") {
      toast.error("Description required..!");
    } else if (qty === "") {
      toast.error("Quantity required..!");
    } else if (price === "") {
      toast.error("Price required..!");
    } else if (Picture === "") {
      toast.error("Cover Image required..!");
    } else {
      const form = new FormData();
      form.append("isbn", isbn);
      form.append("name", name);
      form.append("author", author);
      form.append("description", description);
      form.append("qty", qty);
      form.append("price", price);
      form.append("Picture", Picture);

      dispatch(AddBook(form));
      setIsbn("");
      setAuthor("");
      setName("");
      setDescription("");
      setQty("");
      setPrice("");
      setPicture("");
      setShAddModel(false);
    }
  };

  const DisplayAddModel = () => {
    return (
      <Modal show={shAddModel} onHide={AddModelClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Book</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="modal-style">
            <Col md={6}>
              <Form.Label>ISBN Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter ISBN Number"
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
              />
            </Col>
            <Col md={6}>
              <Form.Label>Author Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Author Name"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </Col>
          </div>
          <div className="modal-style">
            <Col md={12}>
              <Form.Label>Book Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Book Title"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Col>
          </div>
          <div className="modal-style">
            <Col md={6}>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Col>
            <Col md={6}>
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Quntity"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
              />
            </Col>
          </div>
          <div className="modal-style">
            <Col md={12}>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={8}
                placeholder="Enter Book Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Col>
          </div>
          <div className="modal-style">
            <Col md={12}>
              <Form.Label>Cover Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </Col>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={AddModelClose}>
            Close
          </Button>
          <Button variant="primary" onClick={sendData}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const [shUpdateModel, setShUpdateModel] = useState(false);

  const UpdateModelShow = (data) => {
    setShUpdateModel(true);
    setId(data._id);
    setIsbn(data.ISBN_No);
    setAuthor(data.Author);
    setName(data.Book_name);
    setPrice(data.Price);
    setQty(data.Qty);
    setDescription(data.Description);
    setPicture(data.Book_image);
  };

  const UpdateModelClose = (e) => {
    setShUpdateModel(false);
  };

  const sendUpdate = () => {
    const form = new FormData();
      form.append("id", id);
      form.append("isbn", isbn),
      form.append("name", name),
      form.append("author", author),
      form.append("description", description),
      form.append("qty", qty),
      form.append("price", price),
      form.append("Picture", Picture);

    dispatch(upgradeBook(form));
    setIsbn("");
    setAuthor("");
    setName("");
    setDescription("");
    setQty("");
    setPrice("");
    setPicture("");
    setShAddModel(false);
  };
  const DisplayUpdateModel = () => {
    return (
      <Modal show={shUpdateModel} onHide={UpdateModelClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Upgrade Book</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="modal-style">
            <Col md={6}>
              <Form.Label>ISBN Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter ISBN Number"
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
              />
            </Col>
            <Col md={6}>
              <Form.Label>Author Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Author Name"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </Col>
          </div>
          <div className="modal-style">
            <Col md={12}>
              <Form.Label>Book Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Book Title"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Col>
          </div>
          <div className="modal-style">
            <Col md={6}>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Col>
            <Col md={6}>
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Quntity"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
              />
            </Col>
          </div>
          <div className="modal-style">
            <Col md={12}>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={8}
                placeholder="Enter Book Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Col>
          </div>
          <div className="modal-style">
            <Col md={12}>
              <Form.Label>Cover Image</Form.Label>
              <img
                src={`http://localhost:5005/${Picture}`}
                className="image-single"
              />
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </Col>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={UpdateModelClose}>
            Close
          </Button>
          <Button variant="primary" onClick={sendUpdate}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <>
      <Header />

      <div className="display-books">
        <h1>Book Details</h1>
        <button className="add-btn" onClick={AddModelShow}>
          ADD NEW BOOK
        </button>
        <Table striped bordered hover>
          <thead style={{ backgroundColor: "#333", color: "white" }}>
            <tr>
              <th>No</th>
              <th>Book Title</th>
              <th>Author</th>
              <th>ISBN</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((data, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{data.Book_name}</td>
                <td>{data.Author}</td>
                <td>{data.ISBN_No}</td>
                <td>{data.Qty}</td>
                <td>{data.Price}</td>
                <td>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <MDBTooltip tag="a" title="View">
                      <button
                        className="table-btn"
                        onClick={(e) => {
                          DataModelShow(data);
                        }}
                      >
                        <RemoveRedEyeIcon
                          size={20}
                          style={{ height: "1.2rem" }}
                        />
                      </button>
                    </MDBTooltip>
                    <MDBTooltip tag="a" title="Upgrade">
                      <button
                        className="table-btn"
                        onClick={(e) => {
                          UpdateModelShow(data);
                        }}
                      >
                        <ChangeCircleIcon
                          size={20}
                          style={{ height: "1.2rem" }}
                        />
                      </button>
                    </MDBTooltip>
                    <MDBTooltip tag="a" title="Delete">
                      <button
                        className="table-btn"
                        onClick={(e) => {
                          deleteBook(data._id);
                        }}
                      >
                        <DeleteIcon size={20} style={{ height: "1.2rem" }} />
                      </button>
                    </MDBTooltip>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      {DisplayModel()}
      {DisplayAddModel()}
      {DisplayUpdateModel()}

      <Footer />
    </>
  );
};

export default Admin;
