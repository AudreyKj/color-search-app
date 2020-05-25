import React, { useState } from "react";
import axios from "./axios.js";

function Login() {
    const [form, setForm] = useState(true);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState(false);
    const [confirmation, setConfirmation] = useState(false);

    const handleClick = e => {
        e.preventDefault();

        axios.post("/login/submit", { email, password }).then(data => {
            if (data.data.error) {
                return setError(true);
            } else {
                setError(false);
                setForm(false);

                setConfirmation(true);
            }
        });
    };

    return (
        <div>
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

            {error && (
                <span className="error">Auth failed: please try again.</span>
            )}
            {confirmation && (
                <span className="confirmation">Success! You're logged in!</span>
            )}
        </div>
    );
}

export default Login;
