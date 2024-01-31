'use client';

import React, { PropsWithChildren } from "react";
import {
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider,
} from "@tanstack/react-query";

// the QueryCLient class contains a cache for storing data we get from the backend
// using the QueryClientProvider (ReactQueryClientProvider) to pass it to the component tree
const queryClient = new QueryClient();

const QueryClientProvider = ({ children }: PropsWithChildren) => {
  return (
    <ReactQueryClientProvider client={queryClient}>
      {children}
    </ReactQueryClientProvider>
  );
};

export default QueryClientProvider;
