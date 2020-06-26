import React, { Component } from "react";
//altri due elementi importanti dopo il BrowserRouter sono Switch e Router (cè anche Link):
import { Switch, Route } from "react-router-dom";
//Switch: for grouping routers
//Route: Display the specific Route
//Link: serves as an anchor (in NavBar)
import "./App.css";
//inTERMINAL: npm install --save bootstrap
//https://youtu.be/wPQ1-33teR4?t=879
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar";
import ProductList from "./components/ProductList";
//import Cart from "./components/Cart/Cart"; se non si vuole usare package.json nella cartella Cart
import Cart from "./components/Cart"; //se si utilizza package.json in Cart folder
import Default from "./components/Default";
import Details from "./components/Details";
import Modal from "./components/Modal";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Switch>
          <Route
            exact
            path="/"
            /*HOME PAGE col simbolo / ma deve essere "EXACT"*/

            component={ProductList}
          />
          <Route path="/details" component={Details} />
          <Route path="/cart" component={Cart} />
          <Route
            /**nessun PATH cosi si imposta la pagina di errore per ogni altro percorso */

            component={Default}
          />
        </Switch>
        <Modal />
      </React.Fragment>
    );
  }
}

export default App;
