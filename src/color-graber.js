import React, { useState, useEffect } from "react";
import { Palette, Color } from "color-thief-react";
import Dropzone from "react-dropzone";
import axios from "./axios";

function ColorGraber(props) {
    const [url, setUrl] = useState();
    const [palette, setPalette] = useState(false);
    const [file, setFile] = useState();
    const [colors, setColors] = useState();
    const [tag, setTag] = useState();
    const [confirmation_saved, setConfirmation_saved] = useState(false);

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
        setConfirmation_saved(false);
        setPalette(true);
    };

    const savePalette = e => {
        e.preventDefault();
        console.log("colors", colors);
        console.log("tag", tag);
        axios
            .post("/savepalette", { colors, tag })
            .then(res => {
                setTag("");
                setConfirmation_saved(true);
            })
            .catch(error => {
                console.log("error", error);
            });
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
                    {!props.loggedIn && (
                        <span className="graber_instructions">
                            Please register or login to be able to save palettes
                        </span>
                    )}

                    <Palette
                        src={file}
                        crossOrigin="Anonymous"
                        colorCount={5}
                        format="hex"
                    >
                        {({ data, loading }) => {
                            setColors(data);
                            return (
                                <ul style={{ color: data }}>
                                    {data.map(color => (
                                        <li
                                            key={color}
                                            style={{
                                                backgroundColor: color,
                                                boxShadow: `0px 0px 15px 10px ${color}`
                                            }}
                                        >
                                            {color}
                                        </li>
                                    ))}

                                    {props.loggedIn && (
                                        <div>
                                            <form method="POST">
                                                <input
                                                    type="text"
                                                    placeholder="palette tag"
                                                    value={tag}
                                                    onChange={e =>
                                                        setTag(e.target.value)
                                                    }
                                                />
                                                <button
                                                    className="save"
                                                    onClick={savePalette}
                                                >
                                                    SAVE PALETTE
                                                </button>
                                            </form>
                                            {confirmation_saved && (
                                                <span className="palette_saved_confirmation">
                                                    successfully saved! <br />
                                                    all the palettes you've
                                                    saved are in the SAVE
                                                    section
                                                </span>
                                            )}
                                        </div>
                                    )}
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
