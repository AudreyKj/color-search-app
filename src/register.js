import React, { useState } from "react";
import axios from "./axios.js";
import GoogleAuthLogin from "./google-login.js";

function Register(props) {
    const [form, setForm] = useState(true);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [errorNames, setErrorNames] = useState(false);
    const [userNameError, setErrorUserName] = useState("");
    const [errorNotUnique_Email, setErrorNotUnique_Email] = useState("");
    const [errorPw, setErrorPw] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
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

        if (userName.length < 2) {
            setErrorEmail(false);
            setErrorPw(false);
            setErrorNames(false);
            setErrorUserName(false);
            setErrorNotUnique_Email(false);
            return setErrorNames(true);
        }

        if (password.length < 5 || !/[0-9]/g.test(password)) {
            setErrorEmail(false);
            setErrorNames(false);
            setErrorUserName(false);
            setErrorNotUnique_Email(false);
            setErrorNames(false);
            return setErrorPw(true);
        }

        if (email.length < 3 || !email.includes("@")) {
            setErrorNames(false);
            setErrorPw(false);
            setErrorEmail(false);
            setErrorUserName(false);
            setErrorNotUnique_Email(false);
            return setErrorEmail(true);
        }

        axios
            .post("/register", { userName, password, email })
            .then(data => {
                if (data.data.error) {
                    setErrorEmail(false);
                    setErrorPw(false);
                    setErrorNames(false);
                    setErrorUserName(false);
                    setErrorNotUnique_Email(false);
                    return setError(true);
                } else if (data.data.userName_notUnique) {
                    setErrorEmail(false);
                    setErrorPw(false);
                    setErrorNames(false);
                    setErrorNotUnique_Email(false);
                    return setErrorUserName(true);
                } else if (data.data.email_notUnique) {
                    setErrorEmail(false);
                    setErrorPw(false);
                    setErrorNames(false);
                    setErrorUserName(false);
                    return setErrorNotUnique_Email(true);
                } else {
                    setErrorUserName(false);
                    setErrorNotUnique_Email(false);
                    setForm(false);
                    setError(false);
                    setErrorNames(false);
                    setErrorPw(false);
                    setErrorEmail(false);
                    setConfirmation(true);

                    setUserName("");
                    setEmail("");
                    setPassword("");
                    props.updateAppUserLoggedIn();
                    props.updateLogged();
                    setGoogleAuth(false);
                }
            })
            .catch(error => console.log(error));
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
                            value={userName}
                            onChange={e => setUserName(e.target.value)}
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
                            className="password"
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
                    registerSuccess={registerSuccess}
                />
            )}

            <div className="error-conf-messages">
                {errorNames && (
                    <span className="error" data-testid="errorUsername">
                        Please make sure your username is correctly entered.
                    </span>
                )}

                {errorPw && (
                    <span className="error" data-testid="errorPw">
                        Passwords should be min 5 characters and count at least
                        one number.
                    </span>
                )}

                {errorEmail && (
                    <span className="error" data-testid="errorEmail">
                        Please make sure you entered your email correctly.
                    </span>
                )}

                {error && (
                    <span className="error">Error: please try again.</span>
                )}

                {userNameError && (
                    <span className="error">This username already exists.</span>
                )}

                {errorNotUnique_Email && (
                    <span className="error">
                        An account for this email address already exists.
                    </span>
                )}

                {confirmation && (
                    <span className="confirmation" data-testid="confirmation">
                        Success! You're registered!
                    </span>
                )}
            </div>
        </div>
    );
}

export default Register;
