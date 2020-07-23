import React from "react";
import ReactDOM from "react-dom";
import GoogleLogin from "react-google-login";
import { refreshTokenSetup } from "./refreshToken";
import axios from "axios";

function GoogleAuthLogin(props) {
    //onsuccess => display confirmation message on /Login
    const onSuccess = res => {
        console.log("res - googleSignIn", res);
        if (props.loginSuccess) {
            props.loginSuccess();
        } else {
            props.registerSuccess();
        }

        props.updateLogged();
        props.updateGoogleLogged();

        refreshTokenSetup(res);

        let token = { token: res["tokenId"] };

        axios
            .post("/verifygogleauth", token)
            .then(data => console.log(data))
            .catch(error => console.log(error));

        //communicate res["tokenId"] to server
        //check if res["tokenId"] exists in database
        //if not: register user -> insert in database
    };

    //onFailure={onFailure}

    return (
        <div className="auth-google">
            <GoogleLogin
                clientId=""
                buttonText="Sign up or Login with Google"
                onSuccess={onSuccess}
                cookiePolicy={"single_host_origin"}
                isSignedIn={true}
            />
        </div>
    );
}

export default GoogleAuthLogin;
