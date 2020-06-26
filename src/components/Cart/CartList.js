import React from "react";
import CartItem from "./CartItem";

export default function CartList({value} /**dentro {} perche si deve passare solo un certo parametro dell'oggetto */) {
  //per non scrivere sempre value.cart.ecc....
  const { cart } = value;

  return (
    <div className="container-fluid">
      {cart.map((item) => {
        return <CartItem key={item.id} item={item} value={value} />;
      })}
    </div>
  );
}
//https://youtu.be/wPQ1-33teR4?t=16642