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

    const enterCheck = e => {
        if (e.key === "Enter") {
            savePalette(e);
        }
    };

    return (
        <div className="color-graber">
            <Dropzone onDrop={acceptedFiles => handledropped(acceptedFiles)}>
                {({ getRootProps, getInputProps }) => (
                    <div className="drop-graber" {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p className="drop-graber">
                            GET THE COLORS OF AN IMAGE: <br />
                            <br />
                            Drag and drop your image here or click to select
                            your file
                        </p>
                    </div>
                )}
            </Dropzone>

            {palette && (
                <div className="palette" onKeyDown={enterCheck}>
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
                                <>
                                    <ul style={{ color: data }}>
                                        {data.map(color => (
                                            <div className="color">
                                                <li
                                                    key={color + Math.random()}
                                                    style={{
                                                        backgroundColor: color
                                                    }}
                                                ></li>
                                                <span className="color-name">
                                                    {color}
                                                </span>
                                            </div>
                                        ))}
                                    </ul>

                                    {props.loggedIn && (
                                        <div className="palette-save">
                                            <form
                                                method="POST"
                                                className="color-spotter"
                                            >
                                                <input
                                                    type="text"
                                                    placeholder="palette tag"
                                                    value={tag}
                                                    onChange={e =>
                                                        setTag(e.target.value)
                                                    }
                                                />
                                                <span
                                                    className="save"
                                                    onClick={savePalette}
                                                >
                                                    SAVE PALETTE
                                                </span>
                                            </form>
                                            {confirmation_saved && (
                                                <span className="palette_saved_confirmation">
                                                    successfully saved!
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </>
                            );
                        }}
                    </Palette>
                </div>
            )}
        </div>
    );
}

export default ColorGraber;
