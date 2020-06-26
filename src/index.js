import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
//si importa qui il React Router Dom (dopo averlo installato col comando:
//npm install --save react-router-dom). Si puo importare anche in App.js,
//ma qui è più ordinato!
import { BrowserRouter as Router } from "react-router-dom"; //Browser holds all the info of all routes
//importare le informazioni generali che dovrà condividere tutta l'applicazione
import { ProductProvider } from "./context";

ReactDOM.render(
  <ProductProvider>
    <Router>
      <App />
    </Router>
  </ProductProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
