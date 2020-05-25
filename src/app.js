import React from "react";
import ColorGraber from "./color-graber.js";
import Register from "./register";
import { BrowserRouter, Route, NavLink, Link } from "react-router-dom";

function App() {
    return (
        <div>
            <div className="logo "></div>
            <header>
                <span className="color-spot">COLOR SPOT </span>
                <BrowserRouter>
                    <Route path="/register" component={Register}></Route>
                    <Route path="/graber" component={ColorGraber}></Route>
                    <div className="options-buttons">
                        <span className="options"> LOGIN</span>
                        <Link to="/register" className="options">
                            REGISTER
                        </Link>
                        <span className="options"> INFO</span>
                    </div>
                </BrowserRouter>
            </header>
        </div>
    );
}

export default App;

//  <Route path="/login" component={Login}></Route>
