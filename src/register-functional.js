import React, { useState } from "react";
import axios from "./axios.js";

function Register() {
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();
    const [errorPw, setErrorPw] = useState(false);
    const [error, setError] = useState(false);

    const handleChange = e => {
        console.log(e.target.value.firstName);
        setFirstName(e.target.value.firstName);
        setLastName(e.target.value.lastName);
        setPassword(e.target.value.password);
        setEmail(e.target.value.email);
    };

    const handleClick = e => {
        console.log(password);
        e.preventDefault();

        if (password.length < 5 || /[0-9]/gi.test(password)) {
            setError(true);
        }

        axios
            .post("/register", { firstName, lastName, password, email })
            .then(data => {
                if (data.error) {
                    setError(true);
                }
            });
    };

    return (
        <div>
            <div>
                <form method="POST">
                    <label>
                        <input
                            type="text"
                            name="firstName"
                            placeholder="firstName"
                            onChange={handleChange}
                            autoComplete="off"
                        />
                    </label>

                    <input
                        type="text"
                        name="lastName"
                        placeholder="lastName"
                        value={lastName}
                        onChange={handleChange}
                        autoComplete="off"
                    />
                    <input
                        type="text"
                        name="email"
                        placeholder="email"
                        value={email}
                        onChange={handleChange}
                        autoComplete="off"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                        value={password}
                        onChange={handleChange}
                        autoComplete="off"
                    />
                    <button onClick={handleClick}> SUBMIT </button>
                </form>

                {errorPw && (
                    <span className="error">
                        Passwords should be min 5 characters and count at least
                        one number.
                    </span>
                )}

                {error && (
                    <span className="error">
                        Error: something went wrong. Please try again.
                    </span>
                )}
            </div>
        </div>
    );
}

export default Register;
