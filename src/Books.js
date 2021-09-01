import { Component } from "react";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";

class Books extends Component {
  render() {
    return (
      <>
        {this.props.books.length && this.props.books.map((obj) => {
          <Carousel.Item
            key={obj._id}
            style={{ width: "900px", height: "auto" }}
          >
            <img
              className="d-block w-100"
              src="https://static01.nyt.com/images/2019/12/17/books/review/17fatbooks/17fatbooks-jumbo.jpg?quality=90&auto=webp"
              alt={obj.title}
            />
            <Carousel.Caption>
              <p>{obj.status}</p>
              <p>{obj.description}</p>
              <p>{obj.email}</p>
              <Button type="submit" onClick={() => this.props.onDelete(obj)}>
                DELETE
              </Button>
            </Carousel.Caption>
          </Carousel.Item>;
        })}
      </>
    );
  }
}

export default Books;
