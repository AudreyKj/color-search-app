import React, { useState } from "react";
import ColorGraber from "./color-graber.js";
import Register from "./register";
import Login from "./login";
import Saved from "./saved";
import axios from "./axios";
import { BrowserRouter, Route, NavLink, Link } from "react-router-dom";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);

    const logout = () => {
        axios
            .get("/logout")
            .then(res => {
                location.replace("/spotter");
                setLoggedIn(false);
            })
            .catch(error => {
                console.log("error", error);
            });
    };

    return (
        <div className="container">
            <div className="logo "></div>
            <header>
                <span className="color-spot">COLOR SPOT </span>
            </header>

            <BrowserRouter>
                <div className="options-buttons">
                    <Link to="/spotter" className="options">
                        COLOR SPOTTER
                    </Link>
                    <Link to="/saved" className="options">
                        SAVED PALETTES
                    </Link>

                    <span className="options"> INFO</span>
                    <br />
                    <Link to="/login" className="options">
                        LOGIN
                    </Link>
                    <Link to="/register" className="options">
                        REGISTER
                    </Link>

                    <Link to="/profile" className="options">
                        EDIT PROFILE
                    </Link>
                </div>

                {loggedIn && (
                    <button onClick={logout} className="logout">
                        LOGOUT
                    </button>
                )}

                <Route
                    path="/register"
                    render={props => <Register loggedIn={loggedIn} />}
                />

                <Route path="/login" component={Login}></Route>
                <Route path="/spotter" component={ColorGraber}></Route>
                <Route path="/saved" component={Saved}></Route>
            </BrowserRouter>
        </div>
    );
}

export default App;
