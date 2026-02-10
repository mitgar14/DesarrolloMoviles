// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import HelloWorld from "./HelloWorld";
import Contador from "./Contador";
import Arrays from "./Arrays";
import EjemploMontaje from "./EjemploMontaje";
import EjemploDependencia from "./EjemploDependencia";
import PrintMessage from "./PrintMessage";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelloWorld />
    <PrintMessage message="Como te va?" />
    <PrintMessage message="Soy un mensaje!!!" />
    <Contador />
    <Arrays />
    <EjemploMontaje />
    <EjemploDependencia />
  </React.StrictMode>,
);
