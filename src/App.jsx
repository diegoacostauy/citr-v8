import React from "react";
import { createRoot } from "react-dom/client";
import SearchParams from "./SearchParams";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Details from "./Details";

const App = () => (
  <BrowserRouter>
    <div className="main">
      <header>
        <Link to="/">
          <h1>Adopt Me!</h1>
        </Link>
      </header>
      <Routes>
        <Route path="/details/:id" element={<Details/>}/>
        <Route path="/" element={<SearchParams/>}/>
      </Routes>
    </div>
  </BrowserRouter>
);

const root = createRoot(document.getElementById("root"));
root.render(React.createElement(App));
