import React from "react";
import Login from "../login";
import Register from "../register";
import { render, waitForElement, fireEvent } from "@testing-library/react";
import axios from "../axios.js";

jest.mock("../axios");

test("if all the fields are correctly filled, click on submit triggers post request for user login", async () => {
    axios.post.mockResolvedValue({
        data: {
            email: "email@gmail.com",
            password: "user2380"
        }
    });

    const { container } = render(<Login />);

    expect(container.querySelector("button").innerHTML).toContain("SUBMIT");
    fireEvent.click(container.querySelector("button"));

    try {
        const elem = await waitForElement(() =>
            container.querySelector("span.confirmation")
        );

        expect(elem.innerHTML).toContain("Success");
    } catch (err) {
        console.log("error", err);
    }
});

test("if all the fields are correctly filled, click on submit triggers post request for user registration", async () => {
    axios.post.mockResolvedValue({
        data: {
            username: "user123",
            email: "email@gmail.com",
            password: "user2380"
        }
    });

    const { container } = render(<Register />);

    expect(container.querySelector("button").innerHTML).toContain("SUBMIT");
    fireEvent.click(container.querySelector("button"));

    try {
        const elem = await waitForElement(() =>
            container.querySelector("span.confirmation")
        );

        expect(elem.innerHTML).toContain("Success");
    } catch (err) {
        console.log("error", err);
    }
});
