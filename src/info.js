import React from "react";
import { Link } from "react-router-dom";

function Info() {
    return (
        <div className="info-wrapper">
            <p className="info">
                GRAB THE COLORS OF AN IMAGE & SAVE PALETTES <br />
                <br />
                You love an image's mood and would like to know its colors? you
                are designing a product and need some inspiration for the color
                scheme? you are at the right place! This website enables users
                to detect colors in images as well as to save and categorize
                color palettes.
                <br /> <br />
                GET STARTED 🎨 <br />1 - upload an image to the&nbsp;
                <Link className="underline" to="/spotter">
                    color spotter&nbsp;
                </Link>
                to get its color codes
                <br />
                2 - register or login to save palettes and grow collections
                <br /> <br />
                API used: color-thief by Lokesh Dhakar
                <br />
                website made with React and Node.js
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
