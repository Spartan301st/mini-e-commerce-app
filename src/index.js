import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// TODO: REMOVE LATER
// for gql & apollo
import client from "./client.js";
import { ApolloProvider } from "@apollo/client";

// TODO: REMOVE LATER
// for redux toolkit
import { store } from "./app/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Provider>
  </React.StrictMode>
);
