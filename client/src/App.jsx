// import image from "/image.svg";
import "./App.scss";
import { FileSelection } from "./components/FileSelection";
import { Upload } from "./components/Upload";
import { useState } from "react";
import { UploadDone } from "./components/UploadDone";

// View states
const STATE_SELECT_FILE = 0;
const STATE_UPLOAD = 1;
const STATE_UPLOAD_FINISH = 2;

/**
 * Main App
 */
function App() {
  // Current view state
  const [viewState, setViewState] = useState(STATE_SELECT_FILE);
  // Image URL to display and copy
  const [imageUrl, setImageUrl] = useState("");

  /**
   * File has been selected by user
   * @param {Event} event Event with selected file data
   */
  function onFileSelected(files) {
    // Check if file is an image
    if (files[0] && files[0].type.match(/image.*/)) {
      const formData = new FormData();
      setViewState(STATE_UPLOAD);
      formData.append("image", files[0]);
      // Upload selected file to server
      fetch("/image", {
        method: "POST",
        body: formData,
      })
        .then((res) => {
          // Check for error
          if (!res.ok) {
            throw Error(res.statusText);
          }
          // Get text from response
          return res.text();
        })
        .then((url) => {
          // URL obtained, move to finish view
          setImageUrl(url);
          setViewState(STATE_UPLOAD_FINISH);
        })
        .catch((e) => {
          // Error uploading
          console.log(e);
          setImageUrl("");
          setViewState(STATE_UPLOAD_FINISH);
        });
    }
  }

  /**
   * Upload new file
   */
  function onClickNew() {
    setViewState(STATE_SELECT_FILE);
  }

  /**
   * Get the current view to display
   */
  function getView() {
    switch (viewState) {
      default:
      case STATE_SELECT_FILE:
        return <FileSelection onFileSelected={onFileSelected} />;
      case STATE_UPLOAD:
        return <Upload />;
      case STATE_UPLOAD_FINISH:
        return (
          <UploadDone isDone={imageUrl.length > 0} imageUrl={imageUrl} onClickNew={onClickNew} />
        );
    }
  }

  return getView();
}

export default App;
