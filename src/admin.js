import React, { useState, useEffect } from "react";
import axios from "./axios";
import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";

function Admin() {
    //password check
    const [pwCheck, setPwCheck] = useState(
        localStorage.getItem("pwCheck") || true
    );
    const [pageAccess, setPageAccess] = useState(
        localStorage.getItem("pageAccess") || "noAccess"
    );
    const [password, setPassword] = useState("");
    const [errorAccess, setErrorAccess] = useState(false);

    //data dashboard
    const [gender, setGender] = useState();
    const [genderData, setGenderData] = useState();
    const [country, setCountry] = useState();
    const [age, setAge] = useState();
    const [chartReady, setchartReady] = useState(false);

    const verifyPassword = () => {
        axios
            .post("/admin-page-access", { password: password })
            .then(data => {
                if (data.data.error) {
                    setErrorAccess(true);
                } else if (data.data.passwordVerified) {
                    localStorage.setItem("pwCheck", "pwVerified");
                    localStorage.setItem("pageAccess", "accessGranted");
                    setPwCheck("pwVerified");
                    setPageAccess("accessGranted");
                    setErrorAccess(false);
                }
            })
            .catch(error => console.log("error", error));
    };

    useEffect(() => {
        axios
            .get("/data")
            .then(data => {
                //GENDER
                let femaleCount = 0;
                let maleCount = 0;
                let notDefinedCount = 0;

                let genderArr = [];

                for (let i = 0; i < data.data[0].length; i++) {
                    for (let key in data.data[0][i]) {
                        if (data.data[0][i][key] === "female") {
                            femaleCount++;
                        } else if (data.data[0][i][key] === "male") {
                            maleCount++;
                        } else if (data.data[0][i][key] === "gender_null") {
                            notDefinedCount++;
                        }
                    }
                }

                genderArr.push(maleCount, femaleCount, notDefinedCount);

                setGenderData({
                    labels: ["Male", "Female", "not defined"],
                    datasets: [
                        {
                            data: genderArr,
                            backgroundColor: [
                                "#f06c6c",
                                "#b0ace4",
                                "rgba(204, 204, 204, 1)"
                            ],
                            hoverBackgroundColor: ["#ccc", "#ccc", "#ccc"]
                        }
                    ]
                });

                //AGE
                const age = [];
                for (let i = 0; i < data.data[1].length; i++) {
                    for (let key in data.data[1][i]) {
                        age.push(data.data[1][i][key]);
                    }
                }

                const sorted = age.sort((a, b) => {
                    return b - a;
                });

                const ageData = [];

                ageData.push(sorted.shift());
                ageData.push(sorted.pop());

                let average = 0;

                for (let age of sorted) {
                    average += age;
                }
                ageData.push(Math.floor(average / sorted.length));

                setAge({
                    labels: ["oldest user", "youngest user", "average age"],
                    datasets: [
                        {
                            label: "Age",
                            backgroundColor: "rgb(185, 106, 75, 0.7)",
                            borderColor: "rgba(255,99,132,1)",
                            borderWidth: 1,
                            hoverBackgroundColor: "rgb(185, 106, 75, 0.4)",
                            hoverBorderColor: "rgba(255,99,132,1)",
                            data: ageData
                        }
                    ]
                });

                //COUNTRY
                let collect = {};

                for (let i = 0; i < data.data[2].length; i++) {
                    for (let key in data.data[2][i]) {
                        collect[data.data[2][i][key]]
                            ? (collect[data.data[2][i][key]] += 1)
                            : (collect[data.data[2][i][key]] = 1);
                    }
                }

                const country_label = [];
                const country_values = [];

                for (let key in collect) {
                    country_label.push(key);
                    country_values.push(collect[key]);
                }

                setCountry({
                    labels: country_label,
                    datasets: [
                        {
                            data: country_values,
                            backgroundColor: [
                                "#c3e4c4",
                                "#c47c7c",
                                "#c4dce4",
                                "#a48c8c"
                            ],
                            hoverBackgroundColor: [
                                "#ccc",
                                "#ccc",
                                "#ccc",
                                "#ccc"
                            ]
                        }
                    ]
                });
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <div>
            {pwCheck !== "pwVerified" && (
                <div className="admin-auth">
                    Access to the admin page's data dashboard is protected.{" "}
                    <br />
                    Please enter the password to access the page <br />
                    <label forhtml="password">
                        PASSWORD
                        <input
                            type="password"
                            name="password"
                            onChange={e => setPassword(e.target.value)}
                            className="admin-auth"
                        />
                    </label>
                    <button className="submit" onClick={verifyPassword}>
                        SUBMIT
                    </button>
                    {errorAccess && (
                        <span className="error"> Authentication failed </span>
                    )}
                </div>
            )}

            {pageAccess === "accessGranted" && (
                <div className="admin-page">
                    <h1> DASHBOARD: DATA ABOUT THE APP'S USERS </h1>

                    <div className="chart">
                        <div className="single-chart">
                            <Doughnut
                                data={genderData}
                                width={300}
                                height={300}
                                options={{ maintainAspectRatio: false }}
                            />
                        </div>
                        <div className="single-chart">
                            <Bar
                                data={age}
                                width={300}
                                height={200}
                                options={{ maintainAspectRatio: false }}
                            />
                        </div>
                        <div className="single-chart">
                            <Pie
                                data={country}
                                width={300}
                                height={300}
                                options={{ maintainAspectRatio: false }}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Admin;
