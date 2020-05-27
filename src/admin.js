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
                console.log(data);

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
                            backgroundColor: ["#003f5c", "#665191", "#ccc"],
                            hoverBackgroundColor: ["#003f5c", "#665191", "#ccc"]
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
                console.log(sorted);

                const ageData = [];

                ageData.push(sorted.shift());
                ageData.push(sorted.pop());
                console.log(sorted);
                let average = 0;

                for (let age of sorted) {
                    average += age;
                }
                ageData.push(Math.floor(average / sorted.length));

                console.log(ageData);

                setAge({
                    labels: ["oldest user", "youngest user", "average age"],
                    datasets: [
                        {
                            label: "Age",
                            backgroundColor: "rgba(255,99,132,0.2)",
                            borderColor: "rgba(255,99,132,1)",
                            borderWidth: 1,
                            hoverBackgroundColor: "rgba(255,99,132,0.4)",
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
                                "#c6a354",
                                "#938275",
                                "#855936",
                                "#cd601c"
                            ],
                            hoverBackgroundColor: [
                                "#c6a354",
                                "#938275",
                                "#855936",
                                "#cd601c"
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

//</>
