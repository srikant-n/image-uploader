// import image from "/image.svg";
import "./App.scss";
import { FileSelection } from "./components/FileSelection";
import { Upload } from "./components/Upload";
import { useState } from "react";
import { UploadDone } from "./components/UploadDone";

const STATE_SELECT_FILE = 0;
const STATE_UPLOAD = 1;
const STATE_UPLOAD_FINISH = 2;

function App() {
  const [viewState, setViewState] = useState(STATE_SELECT_FILE);
  const [imageUrl, setImageUrl] = useState("");

  /**
   * File has been selected by user
   * @param {Event} event Event with selected file data
   */
  function onFileSelected(files) {
    if (files[0]) {
      const formData = new FormData();
      setViewState(STATE_UPLOAD);
      formData.append("image", files[0]);
      fetch("/image", {
        method: "POST",
        body: formData,
      })
        .then((res) => {
          if (!res.ok) {
            throw Error(res.statusText);
          }
          return res.text();
        })
        .then((url) => {
          setImageUrl(url);
          setViewState(STATE_UPLOAD_FINISH);
        })
        .catch((e) => {
          console.log(e);
          setImageUrl('');
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

  function setView() {
    switch (viewState) {
      default:
      case STATE_SELECT_FILE:
        return <FileSelection onFileSelected={onFileSelected} />;
      case STATE_UPLOAD:
        return <Upload />;
      case STATE_UPLOAD_FINISH:
        return <UploadDone isDone={imageUrl.length > 0} imageUrl={imageUrl} onClickNew={onClickNew} />;
    }
  }

  return setView();
}

export default App;
