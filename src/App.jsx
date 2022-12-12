import React from "react";
import { createRoot } from "react-dom/client";
import Pet from "./Pet";

const App = () => (
  <div className="main">
    <h1>Adopt Me!</h1>
    <Pet name="Luna" animal="Dog" breed="Havanese" />
    <Pet name="Dino" animal="Dog" breed="Bulldog" />
    <Pet name="Miyu" animal="Cat" breed="Mixed" />
  </div>
);

const root = createRoot(document.getElementById("root"));
root.render(React.createElement(App));
