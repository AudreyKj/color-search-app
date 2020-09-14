import React, { useState, useEffect } from "react";
import axios from "axios";

function Shared() {
    const [sharedPalettes, setSharedPalettes] = useState(false);

    useEffect(() => {
        axios.get("/getSharedPalettes").then(data => {
            console.log("shared palette data", data.data.rows);
            setSharedPalettes(data.data.rows);
        });
    }, []);

    return (
        <div className="shared-container">
            {sharedPalettes &&
                sharedPalettes.map(colorSet => (
                    <div className="saved-palette-container" key={colorSet.tag}>
                        <div className="color-palette-save">
                            <div className="palette-options">
                                <span className="color-palette">
                                    tag:{colorSet.tag} <br /> shared by: <br />
                                    {colorSet.username}
                                </span>
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
                                    <span className="color-name">{name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
        </div>
    );
}

export default Shared;
