"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { Children } from "react";

const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
