import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getSession } from "next-auth/react";

import { UserSession } from "./auth";

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT,
});

const authLink = setContext(async (_, { headers }) => {
  const session = await getSession();

  const token = (session as UserSession)?.accessToken;

  const authorizationHeader = token ? { Authorization: `Bearer ${token}` } : {};

  return {
    headers: {
      ...headers,
      ...authorizationHeader,
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

export default client;
