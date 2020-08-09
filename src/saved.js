import React, { useState, useEffect } from "react";
import axios from "./axios";

function Saved(props) {
    const [palettes, setPalettes] = useState();
    const [tag, setTags] = useState();
    const [noResult, setNoResult] = useState(false);

    useEffect(() => {
        axios.get("/savedcolors").then(data => {
            console.log("data.data", data.data);
            setPalettes(data.data);
        });
    }, []);

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

    return (
        <>
            <div className="saved_instructions">
                <span className="title">
                    All the palettes you've saved are displayed here.
                    <br />
                </span>
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
                            <input type="text" onChange={handleChange} />
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
                    palettes.map(colorSet => {
                        if (colorSet.palette !== null) {
                            return colorSet.palette.map(name => (
                                <div className="color" data-testid="color">
                                    <div
                                        className="single-color"
                                        style={{
                                            backgroundColor: name
                                        }}
                                    ></div>
                                    <span className="color-name">{name}</span>
                                    <span className="color-tag">
                                        tag:{colorSet.tag}
                                    </span>
                                </div>
                            ));
                        }
                    })}
            </div>
        </>
    );
}

export default Saved;
