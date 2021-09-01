import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";

class BestBooks extends React.Component {
  /* TODO: Make a GET request to your API to fetch books for the logged in user  */
  render() {
    return (
      <>
        {this.props.books.length ? (
          <Carousel>
            {this.props.books.map((obj) => {
              console.log(obj);
              return(
                <Carousel.Item key={obj._id}>
                  <img
                    className="d-block w-100"
                    src="https://i.ibb.co/X33P1kF/open-book-on-concrete-background.jpg"
                    alt={obj.title}
                  />
                  <Carousel.Caption>
                    <Button type="submit" onClick={() => this.props.onDelete(obj)}>
                    DELETE
                    </Button>
                    <h2>{obj.title}</h2>
                    <div>
                      <p>{obj.status}</p>
                      <p>{obj.description}</p>
                      <p>{obj.email}</p>
                    </div>
                  </Carousel.Caption>
                </Carousel.Item>
              );
            })}
          </Carousel>
        ) : (
          <h3>No Books Found :(</h3>
        )}
      </>
    );
  }
}

export default BestBooks;
