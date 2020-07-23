import React from "react";
import ReactDOM from "react-dom";
import GoogleLogin from "react-google-login";
import { refreshTokenSetup } from "./refreshToken";

function GoogleAuthLogin(props) {
    //"658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"

    //onsuccess => display confirmation message on /Login
    const onSuccess = res => {
        if (props.loginSuccess) {
            props.loginSuccess();
        } else {
            props.registerSuccess();
        }

        props.updateLogged();
        props.updateGoogleLogged();

        refreshTokenSetup(res);
    };

    //onFailure={onFailure}

    return (
        <div className="auth-google">
            <GoogleLogin
                clientId="90923391367-d1nr426bojtevsskh46plv8gjjdlf0sl.apps.googleusercontent.com"
                buttonText="Sign up or Login with Google"
                onSuccess={onSuccess}
                cookiePolicy={"single_host_origin"}
                isSignedIn={true}
            />
        </div>
    );
}

export default GoogleAuthLogin;
