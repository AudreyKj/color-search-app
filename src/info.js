import React from "react";
import { Link } from "react-router-dom";

function Info() {
    return (
        <div className="info-wrapper">
            <p className="info">
                GRAB THE COLORS OF AN IMAGE & SAVE PALETTES <br />
                <br />
                This web app enables users to detect colors in images as well as
                to save and categorize color palettes.
                <br /> <br />
                GET STARTED 🎨 <br /> - upload an image to the&nbsp;
                <Link className="underline" to="/spotter">
                    color spotter&nbsp;
                </Link>
                to get its color codes
                <br />
                - register or login to save palettes and grow collections <br />
                - browse through users' shared palettes in the Shared section{" "}
                <br />
                <br /> <br />
                API used: color-thief by Lokesh Dhakar
                <br />
                made with React and Node.js
                <br /> see on&nbsp;
                <a
                    className="underline"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://github.com/AudreyKj/color-search-app"
                >
                    GitHub
                </a>
            </p>
        </div>
    );
}

export default Info;
