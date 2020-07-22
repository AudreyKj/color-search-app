import React from "react";
import ReactDOM from "react-dom";
import GoogleLogin from "react-google-login";
import { refreshTokenSetup } from "./refreshToken";

function GoogleAuthLogin(props) {
    //"658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"

    //onsuccess => display confirmation message on /Login
    const onSuccess = () => {
        props.loginSuccess();
        props.updateLogged();
        props.pdateGoogleLogged();

        refreshTokenSetup(res);
    };

    //onsuccess => display confirmation message on /Register
    const onFailure = res => {
        console.log("Login failed: res:", res);
        alert(
            `Failed to login. 😢 Please ping this to repo owner twitter.com/sivanesh_fiz`
        );
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
