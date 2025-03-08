"use client";
import { ReactNode } from "react";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo-client";

interface ApolloProviderProps {
  children: ReactNode;
}

export default function ApolloWrapper({ children }: ApolloProviderProps) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
