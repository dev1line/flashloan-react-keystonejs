import { ApolloClient, InMemoryCache } from "@apollo/client";
import { API_CMS } from "../config";

export const client = new ApolloClient({
  uri: API_CMS,
  cache: new InMemoryCache(),
});
