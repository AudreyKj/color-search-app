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
import { Helmet } from "react-helmet";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [footer, setFooter] = useState(true);

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
                if (location.pathname !== "/spotter") {
                    location.replace("/spotter");
                }

                setLoggedIn(false);
            })
            .catch(error => {
                console.log("error", error);
            });
    };

    //    <div className="logo "></div>

    return (
        <div className="container">
            <Helmet>
                <meta property="og:image:width" content="1080" />
                <meta property="og:image:height" content="1080" />
                <meta property="og:image" content="preview.jpg" />
                <meta property="og:image:url" content="preview.jpg" />
            </Helmet>

            <header>
                <span className="color-spot">COLOR SPOT </span>
            </header>

            <BrowserRouter>
                <nav className="options-buttons">
                    <NavLink
                        activeclassname="active"
                        className="nav"
                        to="/spotter"
                    >
                        COLOR SPOTTER
                    </NavLink>

                    <NavLink
                        to="/saved"
                        activeclassname="active"
                        className="nav"
                    >
                        SAVED PALETTES
                    </NavLink>

                    {!loggedIn && (
                        <>
                            <NavLink
                                to="/login"
                                activeclassname="active"
                                className="nav"
                            >
                                LOGIN
                            </NavLink>
                            <NavLink
                                to="/register"
                                activeclassname="active"
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

                    <NavLink
                        to="/info"
                        activeclassname="active"
                        className="nav"
                    >
                        INFO
                    </NavLink>

                    <Link to="/admin" activeclassname="active" className="nav">
                        Admin
                    </Link>

                    {loggedIn && (
                        <button onClick={logout} className="nav">
                            LOGOUT
                        </button>
                    )}
                </nav>

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

            {footer && (
                <footer>
                    <span class="footer-close" onClick={() => setFooter(false)}>
                        X
                    </span>
                    <span class="footer-text">
                        By using this website you agree to the use of cookies.
                        <br />
                        COLOR SPOT © 2020 - see project on&nbsp;
                        <a
                            class="footer-text"
                            href="https://github.com/AudreyKj/color-search-app"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            GitHub
                        </a>
                    </span>
                </footer>
            )}
        </div>
    );
}

export default App;
