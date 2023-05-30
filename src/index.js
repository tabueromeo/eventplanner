import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";

const domNode = document.getElementById("root");
const root = createRoot(domNode);
root.render(<App />);
