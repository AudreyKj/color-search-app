import React from "react";
import Saved from "../saved";
import {render, fireEvent} from "@testing-library/react";

it("invites users to log in or register if the props loggedIn is false", () => {
  const {container} = render(<Saved loggedIn={false}/>);

  expect(container.querySelector("span.graber_instructions").innerHTML).toContain("Please register");

})


it("do not invite users to log in or register if the props loggedIn is true", () => {
  const {container,queryByText } = render(<Saved loggedIn={true}/>);

  expect(queryByText('Please register')).toBeNull()


})


it("invites users to filter out their collection if the props loggedIn is true", () => {
  const {container} = render(<Saved loggedIn={true}/>);

    expect(container.querySelector("span.filter_title").innerHTML).toContain("FILTER BY PALETTE TAG");

})
