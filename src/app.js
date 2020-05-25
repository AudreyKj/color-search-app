import React from "react";
import ColorGraber from "./color-graber.js";
import Register from "./register";
import Login from "./login";
import { BrowserRouter, Route, NavLink, Link } from "react-router-dom";

function App() {
    return (
        <div className="container">
            <div className="logo "></div>
            <header>
                <span className="color-spot">COLOR SPOT </span>
            </header>

            <BrowserRouter>
                <div className="options-buttons">
                    <Link to="/spotter" className="options">
                        SPOTTER
                    </Link>
                    <Link to="/login" className="options">
                        LOGIN
                    </Link>
                    <Link to="/register" className="options">
                        REGISTER
                    </Link>

                    <span className="options"> INFO</span>
                </div>
                <Route path="/register" component={Register}></Route>
                <Route path="/login" component={Login}></Route>
                <Route path="/spotter" component={ColorGraber}></Route>
            </BrowserRouter>
        </div>
    );
}

export default App;
