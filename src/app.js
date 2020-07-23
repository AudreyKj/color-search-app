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
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Logout from "./logout";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [googleLoggedIn, setGoogleLoggedIn] = useState(false);
    const [appUserLoggedIn, setAppUserLoggedIn] = useState(false);

    console.log("loggedIn", loggedIn);

    useEffect(() => {
        axios
            .get("/getloggedIn")
            .then(data => {
                if (data.data === "logged") {
                    setLoggedIn(true);
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

    const updateAppUserLoggedIn = () => {
        if (!appUserLoggedIn) {
            setAppUserLoggedIn(true);
        } else {
            setAppUserLoggedIn(false);
        }
    };

    const updateGoogleLogged = () => {
        if (!googleLoggedIn) {
            setGoogleLoggedIn(true);
        } else {
            setGoogleLoggedIn(false);
        }
    };

    const logout = () => {
        if (googleLoggedIn) {
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function() {
                console.log("User signed out- google");
                auth2.disconnect();
                if (location.pathname !== "/spotter") {
                    location.replace("/spotter");
                }
            });
        } else {
            axios
                .get("/logout")
                .then(res => {
                    if (location.pathname !== "/spotter") {
                        location.replace("/spotter");
                    }

                    props.updateLogged();
                })
                .catch(error => {
                    console.log("error", error);
                });
        }
    };

    return (
        <div className="container">
            <Helmet>
                <meta property="og:image:width" content="1080" />
                <meta property="og:image:height" content="1080" />
                <meta property="og:image" content="preview.jpg" />
                <meta property="og:image:url" content="preview.jpg" />
            </Helmet>
            <AppBar position="static" style={{ background: "#212121" }}>
                <Toolbar>
                    <Typography variant="h5">COLOR SPOT </Typography>

                    <div className="menu">
                        <Button component={Link} to="/info" color="inherit">
                            Info
                        </Button>
                        <Button component={Link} to="/spotter" color="inherit">
                            Color Spotter
                        </Button>
                        <Button component={Link} to="/saved" color="inherit">
                            Saved Palettes
                        </Button>
                        {!loggedIn && (
                            <>
                                <Button
                                    component={Link}
                                    to="/login"
                                    color="inherit"
                                >
                                    Login
                                </Button>

                                <Button
                                    component={Link}
                                    to="/register"
                                    color="inherit"
                                >
                                    Register
                                </Button>
                            </>
                        )}

                        {loggedIn && (
                            <Button onClick={logout} color="inherit">
                                Logout
                            </Button>
                        )}

                        {appUserLoggedIn && (
                            <Button
                                component={Link}
                                to="/profile"
                                color="inherit"
                            >
                                Edit profile
                            </Button>
                        )}

                        <Button component={Link} to="/admin" color="inherit">
                            Admin
                        </Button>
                    </div>
                </Toolbar>
            </AppBar>
            <Route path="/profile" component={Profile}></Route>
            <Route path="/info" component={Info}></Route>
            <Route path="/admin" component={Admin}></Route>
            <Route
                path="/register"
                render={props => (
                    <Register
                        loggedIn={loggedIn}
                        updateLogged={updateLogged}
                        updateAppUserLoggedIn={updateAppUserLoggedIn}
                        updateGoogleLogged={updateGoogleLogged}
                    />
                )}
            />
            <Route
                path="/login"
                render={props => (
                    <Login
                        loggedIn={loggedIn}
                        updateLogged={updateLogged}
                        updateGoogleLogged={updateGoogleLogged}
                        updateAppUserLoggedIn={updateAppUserLoggedIn}
                    />
                )}
            />
            <Route
                path="/saved"
                render={props => (
                    <Saved
                        loggedIn={loggedIn}
                        updateLogged={updateLogged}
                        updateAppUserLoggedIn={updateAppUserLoggedIn}
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

            <footer>
                COLOR SPOT © 2020 - see project on
                <a
                    className="footer-link"
                    href="https://github.com/AudreyKj/color-search-app"
                >
                    &nbsp; GitHub
                </a>
            </footer>
        </div>
    );
}

export default App;
