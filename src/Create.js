import { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

class CreateBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const bookInfo = {
      title: e.target.title.value,
      description: e.target.description.value,
      email: e.target.email.value,
      status: e.target.read.checked,
    };
    this.props.onCreate(bookInfo);
    this.setState({ showModal: false });
  };

  render() {
    const handleClose = () => this.setState({ showModal: false });
    const handleShow = () => this.setState({ showModal: true });
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Add A Book Here
        </Button>
        <Modal show={this.state.showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label>Book Title</Form.Label>
                <Form.Control type="name" placeholder="Enter Title" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control type="name" placeholder="Enter Description" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="name" placeholder="Enter Email" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="read">
                <Form.Check type="checkbox" label="read" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default CreateBook;
