import React, { useState, useEffect } from "react";
import axios from "./axios";

//pass logged in as props from Login: login pass to App,
// APP pass to saved

//if loggin: user can save color

//integrate saved in color-graber?

function Saved() {
    const [palettes, setPalettes] = useState();
    const [tag, setTags] = useState();

    useEffect(() => {
        axios.get("/savedcolors").then(data => {
            setPalettes(data.data);

            const palettes_tags = [];

            data.data.map(elem => {
                palettes_tags.push(elem.tag);
            });
            setTags(palettes_tags);
        });
    }, []);

    const filter = item => {
        console.log("item", item);
        axios
            .post("/filter", { filtering: item })
            .then(data => {
                console.log("data", data);
            })
            .catch(error => {
                console.log("error", error);
            });
    };

    return (
        <div className="saved_palettes_container">
            {palettes &&
                palettes.map(colorSet => {
                    if (colorSet.palette !== null) {
                        console.log("colorSet.palette", colorSet.palette);
                        return colorSet.palette.map(name => (
                            <div className="saved_color">
                                <div
                                    className="single-color"
                                    style={{
                                        backgroundColor: name,
                                        boxShadow: `0px 0px 15px 10px ${name}`
                                    }}
                                >
                                    {name}
                                </div>
                            </div>
                        ));
                    }
                })}
        </div>
    );
}

export default Saved;

// <span className="filter_title">
//     FILTER BY PALETTE TAG <br />
// </span>
// <div className="filter">
//     {tag &&
//         tag.map(item => (
//             <span className="filter" key={item}>
//                 {item}
//             </span>
//         ))}
// </div>
