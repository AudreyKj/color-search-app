import React from "react";
import ReactDOM from "react-dom";
import GoogleLogout from "react-google-login";

function GoogleAuthLogout() {
    //"658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"

    const signOut = () => {
        const auth2 = window.gapi.auth2.getAuthInstance();
        if (auth2 != null) {
            auth2
                .signOut()
                .then(auth2.disconnect().then(this.props.onLogoutSuccess));

            location.replace("/spotter");
            window.location.reload(false);
        }
    };

    return (
        <div>
            <GoogleLogout
                clientId="90923391367-d1nr426bojtevsskh46plv8gjjdlf0sl.apps.googleusercontent.com"
                buttonText="Logout here if you've signed in with Google"
                onLogoutSuccess={signOut}
            ></GoogleLogout>
        </div>
    );
}

export default GoogleAuthLogout;
