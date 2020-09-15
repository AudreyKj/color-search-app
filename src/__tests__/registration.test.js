import React from "react";
import Register from "../register";
import { render, waitForElement, fireEvent } from "@testing-library/react";
import mockedAxios from "../__mocks__/mockedaxios-post.js";

it("error messages appears if fields are not correctly filled", async () => {
    const { container, getByTestId } = render(<Register />);

    const username = "";
    const password = "";
    const email = "";
    const username_input = container.querySelector("input.username");
    const email_input = container.querySelector("input.email");
    const password_input = container.querySelector("input.password");
    fireEvent.change(username_input, { target: { value: username } });
    fireEvent.change(email_input, { target: { value: email } });
    fireEvent.change(password_input, { target: { value: password } });

    fireEvent.click(container.querySelector("button"));

    //username error
    const userError = await waitForElement(() => getByTestId("error"));
    expect(userError.innerHTML).toContain(
        "Please make sure your username is correctly entered."
    );

    fireEvent.change(username_input, { target: { value: "user" } });
    fireEvent.click(container.querySelector("button"));

    //email error
    const emailError = await waitForElement(() => getByTestId("error"));
    expect(emailError.innerHTML).toContain(
        "Please make sure you entered your email correctly."
    );

    fireEvent.change(email_input, { target: { value: "user@email.com" } });
    fireEvent.click(container.querySelector("button"));

    //password error
    const pwError = await waitForElement(() => getByTestId("error"));
    expect(pwError.innerHTML).toContain("Passwords");
});

it("on success, post request to register user", async () => {
    const { container, getByTestId } = render(<Register />);
    const username = "username";
    const password = "pw2306";
    const email = "email@gmail.com";

    mockedAxios.post.mockResolvedValueOnce({
        data: [
            {
                username: username,
                password: password,
                email: email
            }
        ]
    });

    const email_input = container.querySelector("input.email");
    const password_input = container.querySelector("input.password");
    const username_input = container.querySelector("input.username");

    fireEvent.change(username_input, { target: { value: username } });
    fireEvent.change(email_input, { target: { value: email } });
    fireEvent.change(password_input, { target: { value: password } });

    fireEvent.click(container.querySelector("button"));

    await waitForElement(() => getByTestId("confirmation"));

    expect(confirmation).toHaveTextContent("success");
    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
});
