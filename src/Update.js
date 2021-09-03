import { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

class UpdateBook extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const bookInfo = {
      title: e.target.title.value,
      description: e.target.description.value,
      email: e.target.email.value,
      status: e.target.read.checked,
      _id: this.props.book._id,
    };
    this.props.onUpdate(bookInfo);
  };

  render() {
    if (!this.props.book) {
      return null;
    }
    return (
      <>
        <Modal show={this.props.showModal} onHide={this.props.onClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label>Book Title</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter Title"
                  defaultValue={this.props.book.title}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter Description"
                  defaultValue={this.props.book.description}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter Email"
                  defaultValue={this.props.book.email}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="read">
                <Form.Check
                  type="checkbox"
                  label="read"
                  defaultChecked={this.props.book.status}
                />
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

export default UpdateBook;
