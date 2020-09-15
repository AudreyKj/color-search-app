import React from "react";
import Admin from "../admin.js";
import {
    render,
    fireEvent,
    cleanup,
    waitForElement
} from "@testing-library/react";

it("displays form for auth if user is not authentified", () => {
    const { container } = render(<Admin />);

    expect(container.querySelector("form")).toHaveLength(2);
});
