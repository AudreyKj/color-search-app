import React, { useState, useEffect } from "react";
import ColorGraber from "./color-graber.js";
import Register from "./register";
import Profile from "./profile";
import Login from "./login";
import Saved from "./saved";
import Info from "./info";
import Admin from "./admin";
import axios from "./axios";
import { BrowserRouter, Route, NavLink, Link } from "react-router-dom";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        axios
            .get("/getloggedIn")
            .then(data => {
                if (data.data === "logged") {
                    setLoggedIn(true);
                } else {
                    setLoggedIn(false);
                }
            })
            .catch(error => {
                console.log("error", error);
            });
    }, [loggedIn]);

    const updateLogged = () => {
        if (!loggedIn) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    };

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
                    <nav>
                        <NavLink
                            activeClassName="active"
                            className="nav"
                            to="/spotter"
                        >
                            COLOR SPOTTER
                        </NavLink>

                        <NavLink
                            to="/saved"
                            activeClassName="active"
                            className="nav"
                        >
                            SAVED PALETTES
                        </NavLink>

                        <NavLink
                            to="/info"
                            activeClassName="active"
                            className="nav"
                        >
                            INFO
                        </NavLink>

                        <Link
                            to="/admin"
                            activeClassName="active"
                            className="nav"
                        >
                            Admin
                        </Link>

                        {!loggedIn && (
                            <>
                                <NavLink
                                    to="/login"
                                    activeClassName="active"
                                    className="nav"
                                >
                                    LOGIN
                                </NavLink>
                                <NavLink
                                    to="/register"
                                    activeClassName="active"
                                    className="nav"
                                >
                                    REGISTER
                                </NavLink>
                            </>
                        )}

                        {loggedIn && (
                            <NavLink
                                to="/profile"
                                activeClassName="active"
                                className="nav"
                            >
                                EDIT PROFILE
                            </NavLink>
                        )}
                    </nav>
                </div>

                {loggedIn && (
                    <button onClick={logout} className="logout">
                        LOGOUT
                    </button>
                )}

                <Route path="/profile" component={Profile}></Route>
                <Route path="/info" component={Info}></Route>
                <Route path="/admin" component={Admin}></Route>

                <Route
                    path="/register"
                    render={props => (
                        <Register
                            loggedIn={loggedIn}
                            updateLogged={updateLogged}
                        />
                    )}
                />

                <Route
                    path="/login"
                    render={props => (
                        <Login
                            loggedIn={loggedIn}
                            updateLogged={updateLogged}
                        />
                    )}
                />

                <Route
                    path="/spotter"
                    render={props => (
                        <ColorGraber
                            loggedIn={loggedIn}
                            updateLogged={updateLogged}
                        />
                    )}
                />
                <Route
                    path="/saved"
                    render={props => (
                        <Saved
                            loggedIn={loggedIn}
                            updateLogged={updateLogged}
                        />
                    )}
                />
            </BrowserRouter>
        </div>
    );
}

export default App;
