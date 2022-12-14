import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";

// for gql & apollo
import client from "./client.js";
import { ApolloProvider } from "@apollo/client";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
