import React from "react";
import Modal from "react-bootstrap/Modal";

export default function OpenModal(id) {
  console.log("button clickked");
  console.log("iddd--", id);
  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal.Dialog>
        <Modal.Body>
          <p>Are you sure you want to delete</p>
        </Modal.Body>

        <Modal.Footer>
          <button
            className="bg-blue-500"
            onClick={() => console.log("yes clicked")}
          >
            Yes
          </button>
          <button
            className="border border-black"
            onClick={() => console.log("No clicked")}
          >
            No
          </button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}
