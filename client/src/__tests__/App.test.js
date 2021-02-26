import { enableFetchMocks } from "jest-fetch-mock";
import React from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "../App";

enableFetchMocks();

describe("App", () => {
  // global.fetch = jest.fn(() =>
  //     Promise.resolve({
  //       ok: true,
  //       text: () =>
  //         Promise.resolve(
  //           "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
  //         ),
  //     })
  //   );
  beforeEach(() => {
    fetch.resetMocks();
  });

  // test("renders App component", () => {
  //   render(<App />);
  //   // Check if FileSelection loaded
  //   expect(screen.getByText("Choose A File")).toBeInTheDocument();
  // });

  test("Reject file upload from mock api and expect to display upload failed.", async () => {
    render(<App />);
    act(()=>{
      // fetch.mockResponseOnce(
      //   "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
      // );
      fetch.mockReject(new Error('fake error message'));
    });

    const file = new File([new ArrayBuffer(1)], "file.jpg", { type: "image/jpg" });
    const input = screen.getByLabelText("Choose A File");
    userEvent.upload(input, file);
    // Changed to upload view
    expect(screen.getByText("Uploading...")).toBeInTheDocument();

    const text = await screen.findByText("Upload Failed :(");
    expect(text).toBeInTheDocument();
  });

  test("Mock successfull file upload and expect to display upload successful.", async () => {
    render(<App />);
    act(()=>{
      fetch.mockResponseOnce(
        {status:200, ok:true, text: Promise.resolve("https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png")}
      );
    });

    const file = new File([new ArrayBuffer(1)], "file.jpg", { type: "image/jpg" });
    const input = screen.getByLabelText("Choose A File");
    userEvent.upload(input, file);
    // Changed to upload view
    expect(screen.getByText("Uploading...")).toBeInTheDocument();
    const text = await screen.findByText("Uploaded Successfully");
    screen.debug();
    expect(text).toBeInTheDocument();
  });
});
