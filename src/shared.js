import React from "react";

function Shared(props) {
    //users can publish colors here from the saved palettes section
    //publish single colors or palettes?
    //color need to be passed from savedpalettes --> App --> Shared

    return (
        <div>
            <span>Here are all the color palettes that users have shared.</span>
            <span>
                You can add the palettes to your own collections by clicking on
                "GET".
            </span>
            <div> </div>
        </div>
    );
}

export default Shared;
