import React from "react";

function Info() {
    return (
        <div className="info-wrapper">
            <p className="info">
                GRAB THE COLORS OF AN IMAGE & SAVE PALETTES <br /> <br />
                This website enables you to detect colors in images as well as
                save and categorize color palettes. You need to be logged in to
                be able to save palettes & grow collections. <br />
                <br />
                API used: color-thief by Lokesh Dhakar
                <br />
                website made with React and Node.js <br /> developed by&nbsp;
                <a
                    href="https://github.com/AudreyKj"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                >
                    Audrey Kadjar
                </a>
            </p>
        </div>
    );
}

export default Info;
