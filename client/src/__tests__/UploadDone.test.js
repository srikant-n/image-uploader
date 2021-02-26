import React from "react";
import { render, screen } from "@testing-library/react";

import { UploadDone } from "../components/UploadDone";

describe("Upload Done View", () => {
  test("Upload succesful is dispalyed if isDone=true and image url is present", () => {
    render(
      <UploadDone
        isDone={true}
        imageUrl="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
      />
    );
    expect(screen.getByText("Uploaded Successfully")).toBeInTheDocument();
  });

  test("Upload failed is dispalyed if isDone=false", () => {
    render(<UploadDone isDone={false} />);
    expect(screen.getByText("Upload Failed :(")).toBeInTheDocument();
  });
});
