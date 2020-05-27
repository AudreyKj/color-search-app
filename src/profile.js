import React, { useState, useEffect } from "react";
import Moment from "react-moment";
import axios from "./axios";

function Profile() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [date, setDate] = useState();
    const [email, setEmail] = useState();
    const [age, setAge] = useState();
    const [country, setCountry] = useState();
    const [gender, setGender] = useState();
    const [updated, setUpdated] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        axios
            .get("/getprofile")
            .then(({ data }) => {
                console.log("data", data);
                setUsername(data[0].username);
                setEmail(data[0].email);
                setDate(data[0].created_at);
                setGender(data[0].gender);
                setCountry(data[0].country);
                setAge(data[0].age);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const handleChange = e => {
        console.log("e.target.checked");
        const { checked, value } = e.target;

        setGender(value);
    };

    const update = e => {
        e.preventDefault();

        if (password.length < 5 || !/[0-9]/g.test(password)) {
            return setError(true);
        }

        axios
            .post("/updateprofile", {
                username,
                email,
                age,
                password,
                country,
                gender
            })
            .then(data => {
                if (data.data.error) {
                    setError(true);
                } else {
                    setUpdated(true);
                }
            })
            .catch(error => {
                console.log(error, "error");
            });
    };

    const deleteAccount = () => {
        axios
            .post("/delete")
            .then(data => {
                location.replace("/spotter");
            })
            .catch(error => console.log(error));
    };

    return (
        <div className="profile">
            <form className="profile" method="POST">
                <label htmlFor="username">
                    USERNAME
                    <input
                        type="text"
                        name="username"
                        placeholder="username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </label>

                <label htmlFor="email">
                    EMAIL
                    <input
                        type="text"
                        name="email"
                        placeholder="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </label>

                <label htmlFor="password">
                    PASSWORD
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </label>

                <label htmlFor="age">
                    AGE
                    <input
                        type="number"
                        name="age"
                        placeholder="age"
                        value={age}
                        onChange={e => setAge(e.target.value)}
                    />
                </label>

                <label htmlFor="country">
                    COUNTRY
                    <input
                        type="text"
                        name="country"
                        placeholder="country"
                        value={country}
                        onChange={e => setCountry(e.target.value)}
                    />
                </label>

                <label htmlFor="gender">
                    <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={gender === "female"}
                        onChange={e => handleChange(e)}
                    />
                    FEMALE
                    <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={gender === "male"}
                        onChange={e => handleChange(e)}
                    />
                    MALE
                    <input
                        type="radio"
                        name="gender"
                        value="gender_null"
                        checked={gender === "gender_null"}
                        onChange={e => handleChange(e)}
                    />
                    OTHER
                </label>
                <button onClick={update} className="submit">
                    UPDATE
                </button>
            </form>

            {error && (
                <span className="error">
                    Error: please try again. Passwords should be min 5
                    characters and count at least one number.
                </span>
            )}

            {updated && (
                <span className="confirmation">
                    Success: your profile has been updated!
                </span>
            )}

            <span className="account-date">
                account created on <Moment format="MMMM Do YYYY">{date}</Moment>
            </span>
            <button onClick={deleteAccount} className="submit">
                DELETE ACCOUNT
            </button>
        </div>
    );
}

export default Profile;
