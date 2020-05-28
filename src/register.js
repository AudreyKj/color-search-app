import React, { useState } from "react";
import axios from "./axios.js";

function Register(props) {
    const [form, setForm] = useState(true);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [errorNames, setErrorNames] = useState(false);
    const [userNameError, setErrorUserName] = useState("");
    const [errorPw, setErrorPw] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [error, setError] = useState(false);
    const [confirmation, setConfirmation] = useState(false);

    const handleClick = e => {
        e.preventDefault();

        if (userName.length < 2) {
            return setErrorNames(true);
        }

        if (password.length < 5 || !/[0-9]/g.test(password)) {
            return setErrorPw(true);
        }

        if (email.length < 3 || !email.includes("@")) {
            return setErrorEmail(true);
        }

        axios.post("/register", { userName, password, email }).then(data => {
            if (data.error) {
                setError(true);
            } else if (data.data.notUnique) {
                setErrorUserName(true);
            } else {
                setErrorUserName(false);
                setForm(false);
                setError(false);
                setErrorNames(false);
                setErrorPw(false);
                setErrorEmail(false);
                setConfirmation(true);

                setUserName("");
                setEmail("");
                setPassword("");
            }
        });
    };

    return (
        <div>
            {form && (
                <form className="auth" method="POST">
                    <label htmlFor="userName">
                        USERNAME <br />
                        <input
                            type="text"
                            name="username"
                            placeholder="username"
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

            {errorNames && (
                <span className="error">
                    Please make sure your username is correctly entered.
                </span>
            )}

            {errorPw && (
                <span className="error">
                    Passwords should be min 5 characters and count at least one
                    number.
                </span>
            )}

            {errorEmail && (
                <span className="error">
                    Please make sure you entered your email correctly.
                </span>
            )}

            {error && (
                <span className="error">
                    Error: something went wrong. Please try again.
                </span>
            )}

            {userNameError && (
                <span className="error">This username already exists.</span>
            )}

            {confirmation && (
                <span className="confirmation">
                    Success! You're registered!
                </span>
            )}
        </div>
    );
}

export default Register;
