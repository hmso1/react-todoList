import React from "react";
import ReactDOM from "react-dom";
import "./normalize.css";
import App from "./components/App";
import { ThemeProvider } from "styled-components";

const theme = {
  color: {
    orange: "#d07609",
    grey: "#979895",
    white: "#fff",
    red: "#ab0303",
    deepRed: "#ab030378",
    yellow: "#f1a704",
    lightYellow: "#e2aa85",
    black: "#000",
  },
};

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);
