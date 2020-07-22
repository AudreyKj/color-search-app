import React from "react";
import GoogleAuthLogout from "./google-logout.js";
import axios from "axios";

function Logout(props) {
    const logout = () => {
        axios
            .get("/logout")
            .then(res => {
                if (location.pathname !== "/spotter") {
                    location.replace("/spotter");
                }

                props.updateLogged();
            })
            .catch(error => {
                console.log("error", error);
            });
    };

    return (
        <div>
            <button className="submit" onClick={logout}>
                Logout here if you've registered with the app
            </button>
            <GoogleAuthLogout />
        </div>
    );
}

export default Logout;
