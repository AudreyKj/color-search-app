import React from "react";
import ReactDOM from "react-dom";
import ColorGraber from "./color-graber.js";
import App from "./app";

let component;

if (location.pathname === "/") {
    component = <ColorGraber />;
} else {
    component = <App />;
}

ReactDOM.render(component, document.querySelector("main"));
