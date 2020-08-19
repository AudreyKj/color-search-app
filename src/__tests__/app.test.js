import React from "react";
import App from "../App";
import {render } from "@testing-library/react";

it("renders without crashing", () => {
  let container;
    expect(() => {
      container = render(<App />);
    }).not.toThrow();

    expect(container).not.toBeNull();
})
