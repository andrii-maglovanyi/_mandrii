"use client";
import { ApolloProvider } from "@apollo/client";
import { ReactNode } from "react";

import client from "./apollo-client";

interface ApolloProviderProps {
  children: ReactNode;
}

export default function ApolloWrapper({ children }: ApolloProviderProps) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
