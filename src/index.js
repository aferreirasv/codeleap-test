import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#7696ed",
      dark: "#6a87d5",
      light: "#93a8e0",
    },
    secondary: {
      main: "#dddddd",
    },
    red: {
      main: "#ff5151",
    },
    black: {
      main: "#000000",
    },
    green: {
      main: "#47b961",
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>
);
