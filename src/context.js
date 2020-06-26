//context API (alternativa a REDUX che viene direttamente da React)

import React, { Component } from "react";
//importo dei dati effettivi
import { storeProducts, detailProduct } from "./data";

/* function React.createContext<T>
(defaultValue: T, calculateChangedBits?: (prev: T, next: T) => number): React.Context<T> */
const ProductContext = React.createContext();
//abbiamo bisogno di
//1. Provider: da tutte le info a tutti i children
//2. Consumer: usare le info da qualsiasi parte dell'applicazione

//1.
class ProductProvider extends Component {
  state = {
    products: [] /*con "storeProducts" al posto di [],è la referenza alle values, i dati vengono modificati!!*/,
    detailProduct: detailProduct,
    cart: [],
    //per aprire la schermata InCart
    modalOpen: false,
    modalProduct: detailProduct,
    //per la pagina del carrello
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0,
  };
  componentDidMount() {
    this.setProducts();
  }
  //metodo per creare un array partendo dai dati
  setProducts = () => {
    let tempProducts = [];
    storeProducts.forEach((item) => {
      const singleItem = { ...item };
      tempProducts = [...tempProducts, singleItem]; //inserimento dell'array vuoto in cui vengono inseriti i singoli elementi
    });
    this.setState(() => {
      return { products: tempProducts };
      //se tempProducts è sostituito con la parola "products", allora:
      //return {products};
    });
  };

  getItem = (id) => {
    const product = this.state.products.find((item) => item.id === id);
    return product;
  };

  handleDetail = (id) => {
    const product = this.getItem(id);
    this.setState(() => {
      return { detailProduct: product };
    });
  };

  addToCart = (id) => {
    //console.log(`addToCart(context) con id: ${id}`);
    let tempProducts = [...this.state.products];
    //ora si trova l'indice (il primo elemento) di un oggetto e poi si identifica quell'oggetto
    const index = tempProducts.indexOf(this.getItem(id));
    const product = tempProducts[index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;

    this.setState(
      () => {
        return { products: tempProducts, cart: [...this.state.cart, product] };
      }, //callback che viene chiamato una volta aggiunti i dati nel carrello (buona occasione per aggiornare il TOTALE del carrello)
      () => {
        this.addTotals();
      }
    );
  };

  openModal = (id) => {
    const product = this.getItem(id);
    this.setState(() => {
      return { modalProduct: product, modalOpen: true };
    });
  };
  closeModal = () => {
    this.setState(() => {
      return { modalOpen: false };
    });
  };

  //metodi per cart PAGE
  increment = (id) => {

    let tempCart = [...this.state.cart];

    const selected = tempCart.find((item) => item.id === id);

    const index = tempCart.indexOf(selected);

    const product = tempCart[index];
    
    if (product.count < 10){

      product.count = product.count + 1;
  
      product.total = product.count * product.price;
      this.setState(
        () => {
          return {
            cart: [...tempCart],
          };
        },
        () => {
          this.addTotals();
        }
      );
    } 
  };
  decrement = (id) => {
    let tempCart = [...this.state.cart];

    const selected = tempCart.find((item) => item.id === id);

    const index = tempCart.indexOf(selected);

    const product = tempCart[index];
    product.count = product.count - 1;

    if (product.count < 0) {
      this.removeItem(id);
    } else {
      product.total = product.count * product.price;
      this.setState(
        () => {
          return {
            cart: [...tempCart],
          };
        },
        () => {
          this.addTotals();
        }
      );
    }
  };
  removeItem = (id) => {
    let tempProducts = [...this.state.products];
    let tempCart = [...this.state.cart];

    //si filtra l'elemento selezionato
    tempCart = tempCart.filter((item) => item.id !== id);

    //si identifica l'elemento selezionato
    const index = tempProducts.indexOf(this.getItem(id));
    let removedItem = tempProducts[index];

    //si aggiornano i valori di tale dato selezionato
    removedItem.inCart = false;
    removedItem.count = 0;
    removedItem.total = 0;

    this.setState(
      () => {
        //si settano i nuovi valori
        return {
          cart: [...tempCart],
          products: [...tempProducts],
        };
      },
      () => {
        //si aggiorna il totale
        this.addTotals();
      }
    );
  };
  clearCart = (id) => {
    this.setState(
      () => {
        //per dare 0 side-effect, metterli in callback
        // this.setProducts();
        // this.addTotals();
        return {
          cart: [],
        };
      },
      () => {
        this.setProducts();
        this.addTotals();
      }
    );
  };
  addTotals = () => {
    let subTotal = 0;
    //aggiungiamo al Subtotale
    this.state.cart.map((item) => (subTotal += item.total));
    //calcoliamo le tasse
    const tempTax = subTotal * 0.1;
    const tax = parseFloat(
      tempTax.toFixed(2) /** -> si arrotonda con 2 cifre decimali */
    );
    //aggiungiamo le tasse al subTotal
    const total = subTotal + tax;
    //aggiorniamo lo stato generale
    this.setState(() => {
      return {
        cartSubTotal: subTotal,
        cartTax: tax,
        cartTotal: total,
      };
    });
  };
  //tester Method (per verificare se lo stato della bancaDati cambia (non dovrebbe mai modificarsi))
  /* tester = () => {
    console.log("State products: ", this.state.products[0].inCart);
    console.log("Data Product: ", storeProducts[0].inCart);

    const tempProducts = [...this.state.products];
    tempProducts[0].inCart = true;
    this.setState(
      () => {
        return { product: tempProducts };
      },//callback
      () => {
        console.log("State products: ", this.state.products[0].inCart);
        console.log("Data Product: ", storeProducts[0].inCart);
      }
    );
   };*/
  render() {
    return (
      <ProductContext.Provider
        value={{
          //doppia {{}} la prima appartiene a value= e la seconda indica che sto passando un oggetto (...spreading Obj)
          ...this.state,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart,
          openModal: this.openModal,
          closeModal: this.closeModal,
          increment: this.increment,
          decrement: this.decrement,
          removeItem: this.removeItem,
          clearCart: this.clearCart,
        }}
      >
        {/*<button onClick={this.tester}>test me</button>*/}
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

//2.
const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
