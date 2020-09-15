import React from "react";
import Shared from "../saved";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import mockedAxios from "../__mocks__/mockedaxios-get.js";

it("retrieves shared palettes", async () => {
    const { container, getByTestId } = render(<Shared />);

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

    await waitForElement(() => getByTestId("color"));

    expect(color).toHaveTextContent("color tones");
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
});
