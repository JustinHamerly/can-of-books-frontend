import React from "react";
import axios from "axios";
import Books from "./Books.js";
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

  onDelete = async (bookToDelete) => {
    const bookURL = `${SERVER}/books/${bookToDelete._id}`;
    await axios.delete(bookURL);
    const books = this.state.books.filter(
      (book) => book._id !== bookToDelete._id
    );
    this.setState({ books });
  };

  render() {
    /* TODO: render user's books in a Carousel */

    return (
      <>
        {/* <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2> */}

        {this.state.books.length ? (
          <Carousel>
            <Books onDelete={this.onDelete} books={this.state.books} />
          </Carousel>
        ) : (
          <h3>No Books Found :(</h3>
        )}
      </>
    );
  }
}

export default BestBooks;
