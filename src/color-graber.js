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
        <div className="color-graber">
            <Dropzone onDrop={acceptedFiles => handledropped(acceptedFiles)}>
                {({ getRootProps, getInputProps }) => (
                    <section>
                        <div className="drop-graber" {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p className="drop-graber">
                                GET THE COLORS OF AN IMAGE: <br />
                                <br />
                                Drag and drop your image here <br />
                                or click to select your file
                            </p>
                        </div>
                    </section>
                )}
            </Dropzone>

            {palette && (
                <div className="palette">
                    <Palette
                        src={file}
                        crossOrigin="Anonymous"
                        colorCount={8}
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
                </div>
            )}
        </div>
    );
}

export default ColorGraber;

// <div>
//     <form>
//         <input
//             onChange={handleChange}
//             type="text"
//             placeholder="url of your image"
//         />
//         <button onClick={handleClick}> GET COLOR PALETTE </button>
//         <input type="reset" value="Reset" />
//     </form>
