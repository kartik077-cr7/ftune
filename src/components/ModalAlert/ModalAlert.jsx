import { Modal, Button, Form } from "react-bootstrap";

const ModelAlert = ({ name,handleClose,handleDelete }) => {
  return (
    <div>
      <Modal show={true}>
        <Modal.Title style={{ textAlign: "center" }}>
          ARE YOU SURE??
        </Modal.Title>
        <Modal.Body style={{ textAlign: "center" }}>
          Delete {name}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            CLOSE
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            DELETE
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModelAlert;
