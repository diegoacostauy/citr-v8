import React, { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AdoptedPetContextProvider } from "./AdoptedPetContext";

const Details = lazy(() => import("./Details"));
const SearchParams = lazy(() => import("./SearchParams"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AdoptedPetContextProvider>
          <Suspense
            fallback={
              <div className="loading-pane">
                <h2 className="loader">🌀</h2>
              </div>
            }
          >
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
          </Suspense>
        </AdoptedPetContextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(React.createElement(App));
