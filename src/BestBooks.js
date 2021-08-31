import React from "react";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";

const SERVER = process.env.REACT_APP_SERVER_URL;

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    };
  }

  /* TODO: Make a GET request to your API to fetch books for the logged in user  */
  componentDidMount() {
    this.fetchBooks();
  }

  fetchBooks = async () => {
    const config = {
      method: "get",
      baseURL: SERVER,
      url: "/books",
    };
    await axios(config)
      .then((response) => {
        this.setState({ books: response.data });
        console.log(this.state);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  render() {
    /* TODO: render user's books in a Carousel */

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {this.state.books.length ? (
          <Carousel>
            {this.state.books.map((obj) => {
              return (
                <Carousel.Item style={{ width: "900px", height: "auto" }}>
                  <img
                    className="d-block w-100"
                    src="https://static01.nyt.com/images/2019/12/17/books/review/17fatbooks/17fatbooks-jumbo.jpg?quality=90&auto=webp"
                    alt={obj.title}
                  />
                  <Carousel.Caption>
                    <p>{obj.status}</p>
                    <p>{obj.description}</p>
                    <p>{obj.email}</p>
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
