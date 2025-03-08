import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getSession } from "next-auth/react";

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT,
});

const authLink = setContext(async (_, { headers }) => {
  const session = await getSession();

  console.log("SESSION", session);
  // Extract token from the session if available
  const token = (session as any)?.accessToken;

  const authorizationHeader = token ? { Authorization: `Bearer ${token}` } : {};

  return {
    headers: {
      ...headers,
      ...authorizationHeader,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
