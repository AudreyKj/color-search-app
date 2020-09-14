import React, { useState, useEffect } from "react";
import axios from "./axios";

function Saved(props) {
    const [palettes, setPalettes] = useState();
    const [tag, setTags] = useState();
    const [noResult, setNoResult] = useState(false);
    const [successShare, setSuccessShare] = useState(false);

    useEffect(() => {
        axios.get("/savedcolors").then(data => {
            console.log("data", data);
            setPalettes(data.data);
        });
    }, []);

    console.log(palettes);
    console.log("successShare", successShare);

    const handleChange = e => {
        setTags(e.target.value);
        setNoResult(false);
    };

    const filter = e => {
        e.preventDefault();

        axios
            .post("/filter", { tag })
            .then(data => {
                if (
                    data.data.error ||
                    data.data === undefined ||
                    data.data.length === 0
                ) {
                    return setNoResult(true);
                }

                setNoResult(false);
                setPalettes(data.data);
            })
            .catch(error => {
                console.log("error", error);
            });
    };

    const sharePalette = colorSet => {
        console.log("sharing palette");
        axios
            .post("/sharePalette", colorSet)
            .then(data => {
                console.log("data", data);
                setSuccessShare(true);
            })
            .catch(error => {
                console.log("error", error);
            });
    };

    return (
        <>
            <div className="saved_instructions">
                {!props.loggedIn && (
                    <span className="graber_instructions">
                        <br /> Please register or login to save palettes and
                        grow collections.
                    </span>
                )}
            </div>

            <div className="saved_palettes_container">
                {props.loggedIn && (
                    <div className="filtering">
                        <span className="filter_title">
                            FILTER BY PALETTE TAG <br />
                        </span>
                        <form method="POST" className="form-filter">
                            <input
                                type="text"
                                onChange={handleChange}
                                value={tag}
                            />

                            <button className="filter-button" onClick={filter}>
                                FILTER
                            </button>
                        </form>
                        {noResult && (
                            <span className="no-match">
                                No matched tags found
                            </span>
                        )}
                    </div>
                )}

                {palettes &&
                    palettes.map(colorSet => (
                        <div
                            className="saved-palette-container"
                            key={colorSet.tag}
                        >
                            <div className="color-palette-save">
                                <div className="palette-options">
                                    <span className="color-palette">
                                        tag:{colorSet.tag}
                                    </span>
                                    <button
                                        className="share"
                                        onClick={() => sharePalette(colorSet)}
                                    >
                                        SHARE
                                    </button>
                                    {successShare && (
                                        <span className="success">
                                            palette shared!
                                        </span>
                                    )}
                                </div>
                                {colorSet.palette.map(name => (
                                    <div
                                        className="color"
                                        data-testid="color"
                                        key={name + Math.random()}
                                    >
                                        <div
                                            className="single-color"
                                            style={{
                                                backgroundColor: name
                                            }}
                                        ></div>
                                        <span className="color-name">
                                            {name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
            </div>
        </>
    );
}

export default Saved;
