import React from "react";
import ColorGraber from "./color-graber.js";
import { BrowserRouter, Route, NavLink } from "react-router-dom";

function App() {
    return (
        <div>
            <div className="logo "></div>
            <header>
                <span className="color-spot">
                    COLOR SPOT
                    <div className="options-buttons">
                        <span className="options"> LOGIN</span>
                        <span className="options"> REGISTER</span>
                        <span className="options"> INFO</span>
                    </div>
                </span>
            </header>
            <BrowserRouter>
                <Route path="/graber" component={ColorGraber}></Route>
            </BrowserRouter>
        </div>
    );
}

export default App;
