import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllContacts, deleteContact, addContact } from "../actions/contact";
import { logout } from "../actions/auth";
import { Modal, Button, Form, FloatingLabel } from "react-bootstrap";
import { MdDeleteForever } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import { RiLogoutBoxFill } from "react-icons/ri";

const Dashboard = (props) => {
  const { contact } = useSelector((state) => state.contact);
  const { userId } = useSelector((state) => state.auth);
  const [message, setMessage] = useState({});
  const dispatch = useDispatch();
  const [data, setDate] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalDeleteShow, setModalDeleteShow] = useState(false);
  const [contactId, setContactId] = useState();

  let newName = "";
  let newEmail = "";
  let newPhone = "";
  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    setDate(contact);
  }, [contact]);

  function fetchContacts() {
    dispatch(getAllContacts(userId));
  }

  function deleteOneContact(contactId) {
    dispatch(deleteContact(userId, contactId));
    alert("Deleted successfully!");
    setModalDeleteShow(false);
  }

  function logoutUser() {
    dispatch(logout());
    props.history.push("/login");
    // window.location.reload();
  }

  function onChangeName(e) {
    newName = e.target.value;
  }

  function onChangeEmail(e) {
    newEmail = e.target.value;
  }

  function onChangePhone(e) {
    newPhone = e.target.value;
  }

  function addOneContact() {
    dispatch(addContact(newName, newEmail, newPhone, userId))
      .then((data) => {
        setMessage({
          status: "success",
          message: data,
        });
        setModalShow(false);
      })
      .catch((err) => {
        setMessage({
          status: "error",
          message: err,
        });
      });
  }

  if (!userId) {
    return <Redirect to="/login" />;
  }

  function AddContactModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Contact
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel
            controlId="floatingInput"
            label="Name"
            className="mb-3"
          >
            <Form.Control
              className="pt-5"
              type="text"
              defaultValue={newName}
              onChange={(e) => {
                onChangeName(e);
              }}
              placeholder="Enter name"
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Email"
            className="mb-3"
          >
            <Form.Control
              className="pt-5"
              type="email"
              defaultValue={newEmail}
              onChange={(e) => {
                onChangeEmail(e);
              }}
              placeholder="Enter Email"
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Phone"
            className="mb-3"
          >
            <Form.Control
              className="pt-5"
              type="text"
              defaultValue={newPhone}
              onChange={(e) => {
                onChangePhone(e);
              }}
              placeholder="Enter Phone"
            />
          </FloatingLabel>
          {message.status == "success" ? (
            <label style={{ color: "green" }}>{message.message}</label>
          ) : (
            <label style={{ color: "red" }}>{message.message}</label>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-danger btn-block" onClick={props.onHide}>
            Close
          </Button>
          <Button onClick={addOneContact}>Submit</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  function DeleteModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Delete Contact
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you really want to Delete?</Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-danger btn-block" onClick={props.onHide}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              deleteOneContact(contactId);
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <div className="card-contact card-container">
      <Button
        className="float-end"
        variant="danger"
        onClick={() => {
          logoutUser();
        }}
      >
        <RiLogoutBoxFill />
      </Button>
      <h2 style={{ textAlign: "center", color: "blueviolet" }}>
        <u>Dashboard</u>
      </h2>
      {data.length > 0 && (
        <table className="table table-striped">
          <thead style={{ color: "blue" }}>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((contact, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{contact.Name}</td>
                    <td>{contact.Email}</td>
                    <td>{contact.Phone}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-block"
                        // onClick={(e) => {
                        //   deleteOneContact(contact._id);
                        // }}
                        onClick={() => {
                          setContactId(contact._id);
                          setModalDeleteShow(true);
                        }}
                      >
                        <MdDeleteForever />
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}
      <Button
        variant="primary"
        onClick={() => {
          setMessage({});
          setModalShow(true);
        }}
      >
        <IoPersonAddSharp />
      </Button>

      <AddContactModal show={modalShow} onHide={() => setModalShow(false)} />
      <DeleteModal
        show={modalDeleteShow}
        onHide={() => setModalDeleteShow(false)}
      />
    </div>
  );
};
export default Dashboard;
