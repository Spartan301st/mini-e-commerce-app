import { ApolloClient, InMemoryCache } from "@apollo/client";

// apollo client to be passed to ApolloProvider
const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

export default client;
