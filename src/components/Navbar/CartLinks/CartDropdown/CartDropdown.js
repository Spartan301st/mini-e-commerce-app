import React from "react";
import { NavLink } from "react-router-dom";
import Cart from "../../../Cart/Cart.js";
import CartItem from "../../../Cart/CartItem/CartItem";

import "./CartDropdown.scss";

class CartDropdown extends Cart {
  // constructor(props) {
  //   super(props);
  // this.allCartItems = JSON.parse(localStorage.getItem("items")) || false;
  // this.selectedCurrency = JSON.parse(localStorage.getItem("currency"));

  // this.totalAmount = 0;
  // if (this.allCartItems) {
  //   for (let item of this.allCartItems) {
  //     for (let price of item.prices) {
  //       if (price.currency.symbol === this.selectedCurrency.symbol) {
  //         this.totalAmount += price.amount;
  //       }
  //     }
  //   }
  // }
  // this.totalAmount = Number(this.totalAmount.toFixed(2));

  // if (this.allCartItems) {
  //   this.totalNumberOfItems =
  //     this.allCartItems?.reduce((acc, item) => acc + item.quantity, 0) || 0;
  // }
  // }
  render() {
    return (
      <div className="cart-dropdown-container">
        <h2 className="my-bag">
          My bag,{" "}
          <span className="my-bag-quantity">
            {this.totalNumberOfItems} items
          </span>
        </h2>
        {/* TODO: === HERE === TAKE CART AND CARTITEM COMPONENTS OUT AND MAKE THEM REUSABLE CLASSES */}
        {this.allCartItems
          ? this.allCartItems.map((cartItem, i) => (
              <CartItem
                key={i}
                cartItem={cartItem}
                cartItemID={`${i}-${cartItem.name.replaceAll(" ", "-")}`}
              />
            ))
          : ""}
        <div className="total-price">
          <span>Total</span>
          <span>
            {this.selectedCurrency.symbol}
            {this.totalAmount}
          </span>
        </div>
        <div className="action-buttons">
          <NavLink className="btn view-btn" to="/cart">
            View Bag
          </NavLink>
          <button
            className="btn checkout-btn"
            onClick={() => alert("Purchased successfully")}
          >
            Check Out
          </button>
        </div>
      </div>
    );
  }
}

export default CartDropdown;
