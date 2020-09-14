import React from "react";
import Login from "../login";
import { render, fireEvent } from "@testing-library/react";

//POST request on success

it("displays form for users to log in if the loggedIn prop is false", () => {
    const { container } = render(<Login loggedIn={false} />);

    expect(container.querySelector("form")).toHaveLength(3);
});
