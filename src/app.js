import React, { useState, useEffect } from "react";
import ColorGraber from "./color-graber.js";
import Register from "./register";
import Profile from "./profile";
import Login from "./login";
import Saved from "./saved";
import Info from "./info";
import Admin from "./admin";
import Shared from "./shared";
import axios from "./axios";
import { BrowserRouter, Route, Switch, NavLink, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ReactGA from "react-ga";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [googleLoggedIn, setGoogleLoggedIn] = useState(false);
    const [appUserLoggedIn, setAppUserLoggedIn] = useState(false);

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
                //console.log("User signed out- google");
                auth2.disconnect();
                setLoggedIn(false);
            });
        }
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

    return (
        <div className="container">
            <Helmet>
                <title>COLOR SPOT </title>
                <meta
                    name="description"
                    content="color spot - detect colors in images and grow color collections"
                />
                <meta name="keywords" content="colors, design, color palette" />
                <meta name="application-name" content="color spot" />
                <meta name="theme-color" content="black" />
                <meta property="og:image:width" content="1080" />
                <meta property="og:image:height" content="1080" />
                <meta
                    property="og:url"
                    content="https://color-spot.herokuapp.com/"
                />
                <meta
                    property="og:description"
                    content="color spot - detect colors in images and grow color collections"
                />
                <meta property="og:image:width" content="1080" />
                <meta property="og:image:height" content="1080" />
                <meta property="og:image" content="preview.jpg" />
                <meta property="og:image:url" content="preview.jpg" />
            </Helmet>

            <BrowserRouter>
                <AppBar position="static" style={{ background: "#212121" }}>
                    <Toolbar>
                        <div className="title">
                            <img
                                className="logo"
                                src="color-wheel.png"
                                alt="color-circle"
                            />
                            <Typography
                                variant="h5"
                                className="link-header"
                                component={Link}
                                to="/spotter"
                            >
                                COLOR SPOT
                            </Typography>
                        </div>

                        <div className="menu">
                            <Button
                                component={NavLink}
                                to="/info"
                                color="inherit"
                                activeStyle={{
                                    borderBottom:
                                        "solid 3px rgba(248, 248, 248, 0.8)"
                                }}
                            >
                                Info
                            </Button>
                            <Button
                                component={NavLink}
                                to="/spotter"
                                color="inherit"
                                activeStyle={{
                                    borderBottom:
                                        "solid 3px rgba(248, 248, 248, 0.8)"
                                }}
                            >
                                Spotter
                            </Button>

                            <Button
                                component={NavLink}
                                to="/saved"
                                color="inherit"
                                activeStyle={{
                                    borderBottom:
                                        "solid 3px rgba(248, 248, 248, 0.8)"
                                }}
                            >
                                Saved
                            </Button>

                            <Button
                                component={NavLink}
                                to="/shared"
                                color="inherit"
                                activeStyle={{
                                    borderBottom:
                                        "solid 3px rgba(248, 248, 248, 0.8)"
                                }}
                            >
                                Shared
                            </Button>

                            {!loggedIn && (
                                <>
                                    <Button
                                        component={NavLink}
                                        to="/login"
                                        color="inherit"
                                        activeStyle={{
                                            borderBottom:
                                                "solid 3px rgba(248, 248, 248, 0.8)"
                                        }}
                                    >
                                        Login
                                    </Button>

                                    <Button
                                        component={NavLink}
                                        to="/register"
                                        color="inherit"
                                        activeStyle={{
                                            borderBottom:
                                                "solid 3px rgba(248, 248, 248, 0.8)"
                                        }}
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

                            {loggedIn && (
                                <Button
                                    component={NavLink}
                                    to="/profile"
                                    color="inherit"
                                    activeStyle={{
                                        borderBottom:
                                            "solid 3px rgba(248, 248, 248, 0.8)"
                                    }}
                                >
                                    profile
                                </Button>
                            )}

                            <Button
                                component={NavLink}
                                to="/admin"
                                color="inherit"
                                activeStyle={{
                                    borderBottom:
                                        "solid 3px rgba(248, 248, 248, 0.8)"
                                }}
                            >
                                Admin
                            </Button>
                        </div>
                    </Toolbar>
                </AppBar>

                <Switch>
                    <Route path="/profile" component={Profile}></Route>
                    <Route path="/info" component={Info}></Route>
                    <Route path="/admin" component={Admin}></Route>
                    <Route path="/shared" component={Shared}></Route>

                    <Route
                        path="/register"
                        render={props => (
                            <Register
                                loggedIn={loggedIn}
                                updateLogged={updateLogged}
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
                    <Route
                        path="/spotter"
                        render={props => (
                            <ColorGraber
                                loggedIn={loggedIn}
                                updateLogged={updateLogged}
                            />
                        )}
                    />
                </Switch>
            </BrowserRouter>

            <footer>COLOR SPOT © 2020 </footer>
        </div>
    );
}

export default App;

// ReactGA.initialize("UA-174946579-1");
// ReactGA.pageview(window.location.pathname + window.location.search);
