import React, { useState, useEffect } from "react";
import { Palette, Color } from "color-thief-react";
import Dropzone from "react-dropzone";

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

    const handledropped = acceptedFiles => {
        console.log(acceptedFiles);
        //const files = acceptedFiles.dataTransfer.files;
        const localUrl = window.URL.createObjectURL(acceptedFiles[0]);

        setFile(localUrl);
        setPalette(true);
    };

    return (
        <div>
            <form>
                <input
                    onChange={handleChange}
                    type="text"
                    placeholder="url of your image"
                />
                <button onClick={handleClick}> GET COLOR PALETTE </button>
                <input type="reset" value="Reset" />
            </form>

            <Dropzone onDrop={acceptedFiles => handledropped(acceptedFiles)}>
                {({ getRootProps, getInputProps }) => (
                    <section>
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p>
                                Drag 'n' drop some files here, or click to
                                select files
                            </p>
                        </div>
                    </section>
                )}
            </Dropzone>

            {palette && (
                <Palette
                    src={file}
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
