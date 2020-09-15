import React from "react";
import Login from "../login";
import {
    render,
    fireEvent,
    cleanup,
    waitForElement
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockedAxios from "../__mocks__/mockedaxios-post.js";

it("displays form for users to log in if the loggedIn prop is false", () => {
    const { container } = render(<Login loggedIn={false} />);

    expect(container.querySelector("form")).toHaveLength(3);
});

it("performs post request for username and password validation", async () => {
    const { container } = render(<Login />);
    const password = "pw2306";
    const email = "email@gmail.com";
    mockedAxios.post.mockResolvedValueOnce({
        data: [
            {
                password: password,
                email: email
            }
        ]
    });
    const email_input = container.querySelector("input.email");
    const password_input = container.querySelector("input.password");
    fireEvent.change(email_input, { target: { value: email } });
    fireEvent.change(password_input, { target: { value: password } });
    fireEvent.click(container.querySelector("button"));
    await waitForElement(() =>
        expect(mockedAxios.post).toBeCalledWith(email, password)
    );
});
