import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BestBooks from "./BestBooks.js";
import Profile from "./Profile.js";
import CreateBook from "./Create.js";
import Login from "./Login.js";
import axios from "axios";
import { withAuth0 } from "@auth0/auth0-react";
import Alert from "react-bootstrap/Alert";
import UpdateBook from "./Update";

const SERVER = process.env.REACT_APP_SERVER_URL;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // user: null,
      books: [],
      selectedBook: null,
      showModal: false,
      auth: this.props.auth0.isAuthenticated,
    };
  }

  handleGet = async () => {
    console.log("HERE?", this.props.auth0.user);
    this.props.auth0.getIdTokenClaims().then(async (res) => {
      const jwt = res.__raw;
      console.log(jwt);
      const config = {
        headers: { Authorization: `Bearer ${jwt}` },
        method: "get",
        baseURL: SERVER,
        url: "/books",
        params: { email: this.props.auth0.user.email },
      };
      await axios(config)
        .then((response) => {
          console.log("Did we make it?", response.data);
          this.setState({ books: response.data });
        })
        .catch((err) => {
          console.error(err);
        });
    });
  };

  handleCreate = async (bookInfo) => {
    this.props.auth0.getIdTokenClaims().then(async (res) => {
      const jwt = res.__raw;
      const config = {
        headers: { Authorization: `Bearer ${jwt}` },
        method: "post",
        baseURL: SERVER,
        url: "/books",
        data: bookInfo,
        params: { email: this.props.auth0.user.email },
      };
      try {
        const response = await axios(config);
        const newBook = response.data;
        const books = [...this.state.books, newBook];
        this.setState({ books });
      } catch (error) {
        <Alert>Book Input Incorrect. Please Try Again?</Alert>;
      }
    });
  };

  onDelete = async (bookToDelete) => {
    this.props.auth0.getIdTokenClaims().then(async (res) => {
      const jwt = res.__raw;
      const config = {
        headers: { Authorization: `Bearer ${jwt}` },
        method: "delete",
        baseURL: SERVER,
        url: `/books/${bookToDelete._id}`,
        data: bookToDelete,
        params: { email: this.props.auth0.user.email },
      };
      await axios(config);
      const books = this.state.books.filter(
        (book) => book._id !== bookToDelete._id
      );
      this.setState({ books });
    });
  };

  handleUpdateButton = (bookToUpdate) => {
    this.setState({ selectedBook: bookToUpdate });
    this.setState({ showModal: true });
  };

  onUpdate = async (book) => {
    this.props.auth0.getIdTokenClaims().then(async (res) => {
      const jwt = res.__raw;
      const config = {
        headers: { Authorization: `Bearer ${jwt}` },
        method: "put",
        baseURL: SERVER,
        url: `/books/${book._id}`,
        data: book,
        params: { email: this.props.auth0.user.email },
      };
      try {
        const response = await axios(config);
        const updatedBook = response.data;
        const books = this.state.books.map((book) =>
          book._id === updatedBook._id ? updatedBook : book
        );
        this.setState({ books, showModal: false });
      } catch (error) {
        console.log(error);
      }
    });
  };

  onClose = () => {
    this.setState({ selectedBook: null, showModal: false });
  };

  render() {
    console.log(this.state);
    return (
      <>
        <Router>
          <Header user={this.state.user} onLogout={this.logoutHandler} />
          <Switch>
            <Route exact path="/">
              {this.props.auth0.isAuthenticated ? (
                <>
                  <BestBooks
                    handleGet={this.handleGet}
                    books={this.state.books}
                    user={this.state.user}
                    onDelete={this.onDelete}
                    handleUpdateButton={this.handleUpdateButton}
                  />
                  <CreateBook onCreate={this.handleCreate} />
                </>
              ) : (
                <Login handleGet={this.handleGet} />
              )}
              <UpdateBook
                book={this.state.selectedBook}
                showModal={this.state.showModal}
                onClose={this.onClose}
                onUpdate={this.onUpdate}
              />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/delete"></Route>
          </Switch>
          <Footer />
        </Router>
      </>
    );
  }
}

export default withAuth0(App);
