import React, { useState } from "react";
import axios from "./axios.js";

function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [errorNames, setErrorNames] = useState(false);
    const [errorPw, setErrorPw] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [error, setError] = useState(false);
    const [confirmation, setConfirmation] = useState(false);

    const handleClick = e => {
        console.log(password);
        e.preventDefault();

        if (firstName.length < 2 || lastName.length < 2) {
            return setErrorNames(true);
        }

        if (password.length < 5 || !/[0-9]/g.test(password)) {
            console.log("password error");
            return setErrorPw(true);
        }

        if (email.length < 3 || !email.includes("@")) {
            console.log("email error");
            return setErrorEmail(true);
        }

        console.log("firstName", firstName);
        console.log("lastName", lastName);
        console.log("password", password);
        console.log("email", email);

        axios
            .post("/register", { firstName, lastName, password, email })
            .then(data => {
                if (data.error) {
                    setError(true);
                } else {
                    setError(false);
                    setErrorNames(false);
                    setErrorPw(false);
                    setErrorEmail(false);

                    setConfirmation(true);

                    setFirstName("");
                    setLastName("");
                    setEmail("");
                    setPassword("");
                }
            });
    };

    return (
        <div>
            <div>
                <form className="register" method="POST">
                    <input
                        type="text"
                        name="firstName"
                        placeholder="firstName"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        autoComplete="off"
                        required
                    />

                    <input
                        type="text"
                        name="lastName"
                        placeholder="lastName"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        autoComplete="off"
                        required
                    />
                    <input
                        type="text"
                        name="email"
                        placeholder="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        autoComplete="off"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        autoComplete="off"
                        required
                    />
                    <button onClick={handleClick}> SUBMIT </button>
                </form>

                {errorNames && (
                    <span className="error">
                        Please make sure your names are entered correctly.
                    </span>
                )}

                {errorPw && (
                    <span className="error">
                        Passwords should be min 5 characters and count at least
                        one number.
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
                {confirmation && (
                    <span className="confirmation">
                        Success! You're registered!
                    </span>
                )}
            </div>
        </div>
    );
}

export default Register;
