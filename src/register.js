import React, { useState } from "react";
import axios from "./axios.js";
import GoogleAuthLogin from "./google-login.js";
import useStatefulFields from "./customHooks/useStatefulFields.js";
import { SUCCESS, ERROR } from "./Text.js";

function Register(props) {
    const [form, setForm] = useState(true);
    const [values, handleChange] = useStatefulFields();

    const [error, setError] = useState(false);
    const [confirmation, setConfirmation] = useState(false);
    const [googleAuth, setGoogleAuth] = useState(true);

    const registerSuccess = () => {
        setConfirmation(true);
        setError(false);
        setErrorNames(false);
        setErrorPw(false);
        setErrorEmail(false);
        setForm(false);
        setGoogleAuth(false);
        props.updateLogged();
    };

    const googleAuthFailure = () => {
        setError(true);
    };

    const handleClick = e => {
        e.preventDefault();

        const { username, password, email } = values;

        if (!username || username.length < 2) {
            return setError(
                "Please make sure your username is correctly entered."
            );
        }

        if (!email || email.length < 3 || !email.includes("@")) {
            return setError(
                "Please make sure you entered your email correctly."
            );
        }

        if (!password || password.length < 5 || !/[0-9]/g.test(password)) {
            return setError(`Passwords should be min 5 characters and count at least
            one number.`);
        }

        axios
            .post("/register", { values })
            .then(data => {
                console.log("data", data);
                if (data.data.error) {
                    return setError("Error: please try again.");
                } else if (data.data.userName_notUnique) {
                    return setError("This username already exists.");
                } else if (data.data.email_notUnique) {
                    return setError(
                        "An account for this email address already exists."
                    );
                } else {
                    setError(false);
                    setForm(false);
                    setConfirmation(true);

                    props.updateLogged();
                    setGoogleAuth(false);
                }
            })
            .catch(error => {
                console.log("error", error);
                setError(true);
            });
    };

    return (
        <div className="auth-register">
            {form && (
                <form className="auth" method="POST">
                    <label htmlFor="userName">
                        USERNAME <br />
                        <input
                            type="text"
                            name="username"
                            placeholder="username"
                            className="username"
                            onChange={handleChange}
                            autoComplete="off"
                            required
                        />
                    </label>

                    <label htmlFor="email">
                        EMAIL <br />
                        <input
                            type="text"
                            name="email"
                            placeholder="email"
                            className="email"
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
                            placeholder="password"
                            className="password"
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
                    registerSuccess={registerSuccess}
                />
            )}

            <div className="error-conf-messages">
                {error && <ERROR data-testid="error">{error}</ERROR>}

                {confirmation && (
                    <SUCCESS data-testid="confirmation">
                        Success! You're registered!
                    </SUCCESS>
                )}
            </div>
        </div>
    );
}

export default Register;
