import axios from "axios";

var instance = axios.create({
  xsrfCookieName: "csrftoken",
  xsrfHeaderName: "csrf-token"
});

export default instance;
