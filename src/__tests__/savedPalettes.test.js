import React from "react";
import Saved from "../saved";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import mockedAxios from "../__mocks__/mockedaxios-get.js";
import mockedAxiosPost from "../__mocks__/mockedaxios-post.js";

describe("Saved component", () => {
    it("invites users to log in or register if the props loggedIn is false", () => {
        const { container } = render(<Saved loggedIn={false} />);

        expect(
            container.querySelector("span.graber_instructions").innerHTML
        ).toContain("Please register");
    });

    it("do not invite users to log in or register if the props loggedIn is true", () => {
        const { container, queryByText } = render(<Saved loggedIn={true} />);

        expect(queryByText("Please register")).toBeNull();
    });

    it("invites users to filter out their collection if the props loggedIn is true", () => {
        const { container } = render(<Saved loggedIn={true} />);

        expect(
            container.querySelector("span.filter_title").innerHTML
        ).toContain("FILTER BY PALETTE TAG");
    });

    it("retrieves saved palettes with get request, on click shares palette with post request", async () => {
        const { container, getByTestId } = render(<Saved loggedIn={true} />);

        mockedAxios.get.mockResolvedValueOnce({
            data: [
                {
                    id: 1,
                    username: "userOne",
                    palette: [
                        "#FF0000",
                        "#800000",
                        "#FFFF00",
                        "#808000",
                        "#cc00ff"
                    ],
                    tag: "color tones",
                    shared: null
                }
            ]
        });

        mockedAxiosPost.post.mockResolvedValueOnce({
            data: [
                {
                    id: 1,
                    username: "userOne",
                    palette: [
                        "#FF0000",
                        "#800000",
                        "#FFFF00",
                        "#808000",
                        "#cc00ff"
                    ],
                    tag: "color tones",
                    shared: null
                }
            ]
        });

        await waitForElement(() => getByTestId("color"));

        expect(color).toHaveTextContent("color tones");
        expect(mockedAxios.get).toHaveBeenCalledTimes(1);

        fireEvent.click(container.querySelector("button.share"));

        await waitForElement(() => getByTestId("share-success"));
        expect(getByTestId("share-success")).toHaveTextContent(
            "palette shared!"
        );

        expect(mockedAxiosPost.post).toHaveBeenCalledTimes(1);
    });
});
