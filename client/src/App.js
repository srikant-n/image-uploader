// import image from "/image.svg";
import "./App.scss";
import {UploadPage} from "./components/UploadPage"
import {Uploading} from "./components/Uploading"
import { useEffect, useState } from "react";
import {Button, Card, Container} from "react-bootstrap";
import { UploadDone } from "./components/UploadDone";

function App() {
  const [connectionText, setConnectionText] = useState("Connecting to Express server");

  // useEffect(() => {
  //   fetch("/express_backend")
  //     .then((response) => response.json())
  //     .then((data) => setConnectionText(data.express))
  //     .catch((e) => console.log(e));
  // });

  return (
    <div>
    <UploadPage />
    </div>
  );
}

export default App;
