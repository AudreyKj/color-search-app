import React, { useState, useEffect } from "react";
import axios from "axios";

function Shared() {
    const [sharedPalettes, setSharedPalettes] = useState(false);

    useEffect(() => {
        axios.get("/getSharedPalettes").then(data => {
            console.log("data", data);
            setSharedPalettes(data.data);
        });
    }, []);

    return (
        <div>
            <div></div>
        </div>
    );
}

export default Shared;

// {sharedPalettes && sharedPalettes.map(palette => {
//
// })}
