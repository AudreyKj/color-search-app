import React, { useState } from "react";
import axios from "./axios.js";
import GoogleAuthLogin from "./google-login.js";
import useStatefulFields from "./customHooks/useStatefulFields.js";

function Login(props) {
    const [form, setForm] = useState(true);
    const [googleAuth, setGoogleAuth] = useState(true);
    const [values, handleChange] = useStatefulFields();
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

        axios.post("/login/submit", { values }).then(data => {
            console.log("data", data);
            if (data.data.error) {
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
                            className="email"
                            placeholder="email"
                            onChange={handleChange}
                            autoComplete="off"
                            required
                        />
                    </label>
                    <label htmlFor="password">
                        PASSWORD <br />
                        <input
                            type="password"
                            name="password"
                            className="password"
                            placeholder="password"
                            onChange={handleChange}
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
