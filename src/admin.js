import React, { useState, useEffect } from "react";
import axios from "./axios";
import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";

function Admin() {
    const [gender, setGender] = useState();
    const [genderData, setGenderData] = useState();
    const [country, setCountry] = useState();
    const [age, setAge] = useState();
    const [chartReady, setchartReady] = useState(false);

    console.log(genderData);

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
                                "rgba(93, 114, 146, 1)",
                                "rgba(109, 79, 107, 1)",
                                "rgba(204, 204, 204, 1)"
                            ],
                            hoverBackgroundColor: [
                                "rgba(93, 114, 146, 0.5)",
                                "rgba(109, 79, 107, 0.5)",
                                "rgba(204, 204, 204, 0.5)"
                            ]
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
                                "rgb(176, 107, 66)",
                                "rgb(222, 169, 77)",
                                "rgb(221, 203, 86)",
                                "rgba(115, 79, 36, 1)"
                            ],
                            hoverBackgroundColor: [
                                "rgba(176, 107, 66, 0.5)",
                                "rgba(222, 169, 77, 0.5)",
                                "rgb(221, 203, 86, 0.5)",
                                "rgba(115, 79, 36, 0.5)"
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
        <>
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
        </>
    );
}

export default Admin;
