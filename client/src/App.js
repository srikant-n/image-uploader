import logo from "./logo.svg";
import "./App.scss";
import { useEffect, useState } from "react";

function App() {
  const [connectionText, setConnectionText] = useState("Connecting to Express server");

  useEffect(() => {
    fetch("/express_backend")
      .then((response) => response.json())
      .then((data) => setConnectionText(data.express))
      .catch((e) => console.log(e));
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{connectionText}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
