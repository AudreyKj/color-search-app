import React from "react";
import Register from "../register";
import { render, waitForElement, fireEvent } from "@testing-library/react";
import mockedAxios from "../__mocks__/mockedaxios.js";

it("error message appears if username has not been entered", async () => {
    const { container, getByTestId } = render(<Register />);

    const username = "";
    const password = "";
    const email = "email@gmail.com";
    const username_input = container.querySelector("input.username");
    const email_input = container.querySelector("input.email");
    const password_input = container.querySelector("input.password");
    fireEvent.change(username_input, { target: { value: username } });
    fireEvent.change(email_input, { target: { value: email } });
    fireEvent.change(password_input, { target: { value: password } });

    fireEvent.click(container.querySelector("button"));

    const errorMessage = await waitForElement(() =>
        getByTestId("errorUsername")
    );

    expect(errorMessage.innerHTML).toContain(
        "Please make sure your username is correctly entered."
    );
});

it("error message appears if password has not been entered", async () => {
    const { container, getByTestId } = render(<Register />);

    const username = "username";
    const password = "";
    const email = "email@gmail.com";
    const username_input = container.querySelector("input.username");
    const email_input = container.querySelector("input.email");
    const password_input = container.querySelector("input.password");
    fireEvent.change(username_input, { target: { value: username } });
    fireEvent.change(email_input, { target: { value: email } });
    fireEvent.change(password_input, { target: { value: password } });

    fireEvent.click(container.querySelector("button"));

    const errorMessage = await waitForElement(() => getByTestId("errorPw"));

    expect(errorMessage.innerHTML).toContain(
        "Passwords should be min 5 characters"
    );
});

it("error message appears if email has not been entered", async () => {
    const { container, getByTestId } = render(<Register />);

    const username = "username";
    const password = "pw2306";
    const email = "";
    const username_input = container.querySelector("input.username");
    const email_input = container.querySelector("input.email");
    const password_input = container.querySelector("input.password");
    fireEvent.change(username_input, { target: { value: username } });
    fireEvent.change(email_input, { target: { value: email } });
    fireEvent.change(password_input, { target: { value: password } });

    fireEvent.click(container.querySelector("button"));

    const errorMessage = await waitForElement(() => getByTestId("errorEmail"));

    expect(errorMessage.innerHTML).toContain(
        "Please make sure you entered your email correctly."
    );
});

it("if all fields are correctly filled, click on button triggers post request and success message", async () => {
    mockedAxios.post.mockResolvedValueOnce({
        data: [
            {
                username: "user123",
                password: "password4523",
                email: "email@gmail.com"
            }
        ]
    });

    const { container, getByTestId } = render(<Register />);

    const username = "user123";
    const password = "password4523";
    const email = "email@gmail.com";
    const username_input = container.querySelector("input.username");
    const email_input = container.querySelector("input.email");
    const password_input = container.querySelector("input.password");
    fireEvent.change(username_input, { target: { value: username } });
    fireEvent.change(email_input, { target: { value: email } });
    fireEvent.change(password_input, { target: { value: password } });

    fireEvent.click(container.querySelector("button"));

    const successMessage = await waitForElement(() =>
        getByTestId("confirmation")
    );

    expect(mockedAxios.post).toHaveBeenCalledTimes(1);

    expect(errorMessage.innerHTML).toContain("Success");
});
