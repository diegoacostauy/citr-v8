import React from "react";
import { createRoot } from "react-dom/client";

const Pet = (props) =>
  React.createElement("div", {}, [
    React.createElement("h1", {}, props.name),
    React.createElement("h2", {}, props.animal),
    React.createElement("h2", {}, props.breed),
  ]);

const App = () =>
  React.createElement(
    "div",
    {
      className: "main",
    },
    [
      React.createElement("h1", {}, "Adopt Me!"),
      React.createElement(Pet, {
        name: "Luna",
        animal: "Dog",
        breed: "Havanese",
      }),
      React.createElement(Pet, {
        name: "Dino",
        animal: "Dog",
        breed: "Bulldog",
      }),
      React.createElement(Pet, { name: "Miyu", animal: "Cat", breed: "Mixed" }),
    ]
  );

const root = createRoot(document.getElementById("root"));
root.render(React.createElement(App));
