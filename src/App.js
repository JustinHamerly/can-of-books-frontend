import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BestBooks from "./BestBooks.js";
import Profile from "./Profile.js";
import CreateBook from "./Create.js";
import axios from "axios";
import Alert from "react-bootstrap/Alert";

const SERVER = process.env.REACT_APP_SERVER_URL;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      books: [],
    };
  }
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

  loginHandler = (email) => {
    this.setState({
      user: email,
    });
  };

  logoutHandler = () => {
    this.setState({
      user: null,
    });
  };

  handleCreate = async (bookInfo) => {
    try {
      const bookURL = `${SERVER}/books`;
      const response = await axios.post(bookURL, bookInfo);
      const newBook = response.data;
      const books = [...this.state.books, newBook];
      this.setState({ books });
    } catch (error) {
      <Alert>Book Input Incorrect. Please Try Again?</Alert>;
    }
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
    console.log(this.state);
    return (
      <>
        <Router>
          <Header user={this.state.user} onLogout={this.logoutHandler} />
          <Switch>
            <Route exact path="/">
              {/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}
              <BestBooks books={this.state.books} user={this.state.user} onDelete={this.onDelete} />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/create">
              <CreateBook onCreate={this.handleCreate} />
            </Route>
            <Route path="/delete"></Route>
          </Switch>
          <Footer />
        </Router>
      </>
    );
  }
}

export default App;
