import React, { useState } from "react";
import axios from "./axios.js";
import GoogleAuthLogin from "./google-login.js";

function Login(props) {
    const [form, setForm] = useState(true);
    const [googleAuth, setGoogleAuth] = useState(true);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState(false);
    const [confirmation, setConfirmation] = useState(false);

    const loginSuccess = () => {
        setConfirmation(true);
        setError(false);
        setForm(false);
        setGoogleAuth(false);
        props.updateLogged();
    };

    const googleAuthFailure = () => {
        setError(true);
    };

    const handleClick = e => {
        e.preventDefault();

        axios.post("/login/submit", { email, password }).then(data => {
            if (data.data.error) {
                console.log(data.data);
                return setError(true);
            } else {
                props.updateLogged();
                props.updateAppUserLoggedIn();
                setError(false);
                setForm(false);
                setGoogleAuth(false);
                setConfirmation(true);
            }
        });
    };

    return (
        <div className="auth-login">
            {form && (
                <form className="auth" method="POST">
                    <label htmlFor="email">
                        EMAIL <br />
                        <input
                            type="text"
                            name="email"
                            placeholder="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            autoComplete="off"
                            required
                        />
                    </label>
                    <label htmlFor="password">
                        PASSWORD <br />
                        <input
                            type="password"
                            name="password"
                            placeholder="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            autoComplete="off"
                            required
                        />
                    </label>
                    <button className="submit" onClick={handleClick}>
                        SUBMIT
                    </button>
                </form>
            )}

            {googleAuth && (
                <GoogleAuthLogin
                    updateLogged={props.updateLogged}
                    updateGoogleLogged={props.updateGoogleLogged}
                    loginSuccess={loginSuccess}
                    googleAuthFailure={googleAuthFailure}
                />
            )}

            <div className="error-conf-messages">
                {error && (
                    <span className="error">
                        Authentication failed; try again or register.
                    </span>
                )}
                {confirmation && (
                    <span className="confirmation" data-testid="confirmation">
                        Success! You're logged in!
                    </span>
                )}
            </div>
        </div>
    );
}

export default Login;
