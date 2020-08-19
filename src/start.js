import React from "react";
import ReactDOM from "react-dom";
import ColorGraber from "./color-graber.js";
import App from "./app";
import { BrowserRouter } from "react-router-dom";

let component;


    component = 
        <BrowserRouter>
            <App />
        </BrowserRouter>


ReactDOM.render(component, document.querySelector("main"));
