import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllContacts, deleteContact } from "../actions/contact";
import {Modal, Button} from 'react-bootstrap'

const Dashboard = () => {
  const { contact } = useSelector((state) => state.contact);
  const { userId } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const [data, setDate] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);

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
  }

  function addOneContact(contactId) {}

  if (!userId) {
    return <Redirect to="/login" />;
  }

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <div className="card-contact card-container">
      <table className="table table-striped">
        <thead>
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
                      onClick={(e) => {
                        deleteOneContact(contact._id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Launch vertically centered modal
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
};
export default Dashboard;
