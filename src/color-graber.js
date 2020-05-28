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
    };

    const handleClick = e => {
        e.preventDefault();
        setPalette(true);
    };

    const handledropped = acceptedFiles => {
        const localUrl = window.URL.createObjectURL(acceptedFiles[0]);

        setFile(localUrl);
        setConfirmation_saved(false);
        setPalette(true);
    };

    const savePalette = e => {
        e.preventDefault();

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
                                        <div className="palette-save">
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
                                                    successfully saved!
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
