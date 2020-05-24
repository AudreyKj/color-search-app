import React, { useState, useEffect } from "react";
import { Palette, Color } from "color-thief-react";

import axios from "./axios.js";

function ColorGraber() {
    const [url, setUrl] = useState();
    const [palette, setPalette] = useState(false);
    const [file, setFile] = useState();

    const handleChange = e => {
        setUrl(e.target.value);
        console.log(url);
    };

    const handleClick = e => {
        e.preventDefault();
        console.log(url);
        setPalette(true);
    };

    // useEffect(() => {
    //     const formData = new FormData();
    //     formData.append("file", file);
    //     console.log("formData", formData);
    //     axios
    //         .post("/upload", file)
    //         .then(({ data }) => {
    //             console.log(data);
    //         })
    //         .catch(function(error) {
    //             console.log(error);
    //         });
    // }, [file]);

    //handleChange for file upload
    const handleChange2 = event => {
        console.log("event.target.files[0]", event.target.files[0]);

        setFile({ file: event.target.files[0] });

        const formData = new FormData();
        formData.append("file", file);
        console.log("formData", formData);
        axios
            .post("/upload", file)
            .then(({ data }) => {
                console.log(data);
            })
            .catch(function(error) {
                console.log(error);
            });
    };

    return (
        <div>
            <form>
                <input
                    onChange={handleChange}
                    type="text"
                    placeholder="url of your image"
                />
                <input
                    onChange={handleChange2}
                    id="file-upload"
                    className="file"
                    type="file"
                    name="file"
                    accept="image/*"
                />
                <button onClick={handleClick}> GET COLOR PALETTE </button>
                <input type="reset" value="Reset" />
            </form>

            {palette && (
                <Palette
                    src={url}
                    crossOrigin="Anonymous"
                    colorCount={5}
                    format="hex"
                >
                    {({ data, loading }) => {
                        return (
                            <ul style={{ color: data }}>
                                {data.map(color => (
                                    <li
                                        key={color}
                                        style={{ backgroundColor: color }}
                                    >
                                        {color}
                                    </li>
                                ))}
                            </ul>
                        );
                    }}
                </Palette>
            )}
        </div>
    );
}

export default ColorGraber;
