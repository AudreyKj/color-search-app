let collect = {};

const data = [
    { country: "France" },
    { country: "Germany" },
    { country: "France" },
    { country: "UK" },
    { country: "Germany" },
    { country: "France" },
    { country: "Italy" },
    { country: "Italy" },
    { country: "Germany" },
    { country: "Germany" }
];

for (let i = 0; i < data.length; i++) {
    for (let key in data[i]) {
        collect[data[i][key]]
            ? (collect[data[i][key]] += 1)
            : (collect[data[i][key]] = 1);
    }
}

const label = [];
const values = [];

for (let key in collect) {
    label.push(key);
    values.push(collect[key]);
}

/* div.filter {
    width: 100%;

    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    margin-top: 20px;
    padding-bottom: 20px;
} */
