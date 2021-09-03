import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <Auth0Provider
    domain="dev-2fw28m-y.us.auth0.com"
    clientId="yktQMNFw9HN9rZ9vF1bBL4lYVvZ41fG3"
    redirectUri="http://localhost:3000"
    // redirectUri="https://quirky-swanson-4bb5e7.netlify.app/"
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);
