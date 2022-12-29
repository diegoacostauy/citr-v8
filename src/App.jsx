import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Link } from "react-router-dom";
import { AdoptedPetContextProvider } from "./AdoptedPetContext";
import Details from "./Details";
import SearchParams from "./SearchParams";

// const Details = lazy(() => import("./Details"));
// const SearchParams = lazy(() => import("./SearchParams"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
      suspense: true,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AdoptedPetContextProvider>
        <div className="main">
          <header>
            <Link to="/">
              <h1>Adopt Me!</h1>
            </Link>
          </header>
          <Routes>
            <Route path="/details/:id" element={<Details />} />
            <Route path="/" element={<SearchParams />} />
          </Routes>
        </div>
      </AdoptedPetContextProvider>
    </QueryClientProvider>
  );
};

export default App;
