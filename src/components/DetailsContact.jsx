import React from "react";
import { Modal } from "react-bootstrap";

const DetailsContact = ({ data, show, setShow }) => {
  const modalClose = () => {
    setShow(false);
  };
  return (
    <div>
      <Modal show={show} onHide={() => modalClose()} className="" size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Contact Info</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <div className="row">
            <div className="col-6">
              <p className="fw-bold">Country</p>
              <p className="fw-bold">Phone</p>
            </div>
            <div className="col-6">
              <p>{data?.country?.name}</p>
              <p>{data?.phone}</p>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DetailsContact;
