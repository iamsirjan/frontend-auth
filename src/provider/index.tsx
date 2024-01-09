import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import React from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      staleTime: 30 * 1000,
    },
  },
});

const Provider = ({ children }: IProvider) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-right" />
      <HelmetProvider>{children}</HelmetProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default Provider;

interface IProvider {
  children: React.ReactNode;
}
