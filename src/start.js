import React from "react";
import ReactDOM from "react-dom";
import ColorGraber from "./color-graber.js";
import App from "./app";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

//redux boilerplate code
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducer.js";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

let component;

if (location.pathname === "/") {
    component = <ColorGraber />;
} else {
    component = (
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    );
}

ReactDOM.render(component, document.querySelector("main"));
