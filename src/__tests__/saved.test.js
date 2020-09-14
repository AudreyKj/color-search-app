import React from "react";
import Register from "../register";
import {
    render,
    waitForElement,
    fireEvent,
    cleanup
} from "@testing-library/react";
import mockedAxios from "../__mocks__/mockedaxios.js";
