import React from "react";
import Register from "../register";
import { render, waitForElement, fireEvent } from "@testing-library/react";

it("error message appears if username has not been entered", async () => {
    const { container } = render(<Register />);
    const { getByTestId } = render(<Register />);

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
    const { container } = render(<Register />);
    const { getByTestId } = render(<Register />);

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
    const { container } = render(<Register />);
    const { getByTestId } = render(<Register />);

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
