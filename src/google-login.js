import React from "react";
import ReactDOM from "react-dom";
import GoogleLogin from "react-google-login";
import { refreshTokenSetup } from "./refreshToken";
import axios from "./axios";

function GoogleAuthLogin(props) {
    const onSuccess = res => {
        //console.log("res - googleSignIn", res);
        if (props.loginSuccess) {
            props.loginSuccess();
        } else {
            props.registerSuccess();
        }

        props.updateLogged();
        props.updateGoogleLogged();

        refreshTokenSetup(res);

        let token = { token: res["googleId"] };
        //console.log("token", token);

        axios
            .post("/verifygogleauth", token)
            .then(data => console.log(""))
            .catch(error => console.log(error));
    };

    const onFailure = () => {
        props.googleAuthFailure();
    };

    return (
        <div className="auth-google">
            <GoogleLogin
                clientId="90923391367-d1nr426bojtevsskh46plv8gjjdlf0sl.apps.googleusercontent.com"
                buttonText="Sign up or Login with Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={"single_host_origin"}
                isSignedIn={true}
            />
        </div>
    );
}

export default GoogleAuthLogin;
