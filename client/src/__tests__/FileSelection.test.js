import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { FileSelection } from "../components/FileSelection";

describe("File Selection", () => {

  test("call onChange to parent on image selection", () => {
    const file = new File([new ArrayBuffer(1)], "file.jpg", { type: "image/jpg" });
    const onFileSelected = jest.fn((files) => {
      expect(files[0]).toStrictEqual(file);
      expect(files.item(0)).toStrictEqual(file);
      expect(files).toHaveLength(1);
    });
    render(<FileSelection onFileSelected={onFileSelected} />);
    const input = screen.getByLabelText("Choose A File");
    userEvent.upload(input, file);

    expect(input.files[0]).toStrictEqual(file);
    expect(input.files.item(0)).toStrictEqual(file);
    expect(input.files).toHaveLength(1);
  });

  test("call onChange to parent on drag and drop image", () => {
    const file = new File([new ArrayBuffer(1)], "file.jpg", { type: "image/jpg" });
    const onFileSelected = jest.fn((files) => {
      expect(files[0]).toStrictEqual(file);
      expect(files).toHaveLength(1);
    });
    render(<FileSelection onFileSelected={onFileSelected} />);
    const input = screen.getByText("Drag & Drop image here")
    fireEvent.drop(input, {
      dataTransfer: {
        files: [file],
        clearData: () => {}
      },
    });

  });
});
