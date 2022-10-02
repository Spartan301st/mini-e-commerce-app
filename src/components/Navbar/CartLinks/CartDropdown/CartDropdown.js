import React from "react";
import "./CartDropdown.scss";
import { NavLink } from "react-router-dom";

import Cart from "../../../Cart/Cart.js";
import CartItem from "../../../Cart/CartItem/CartItem";

// note that CartDropdown extends Cart, therefore we have access to its props, that are used below
class CartDropdown extends Cart {
  render() {
    return (
      <>
        <div className="cart-dropdown-container">
          {this.allCartItems.length ? (
            <div className="cart-dropdown-info-container">
              <h2 className="my-bag">
                My bag,{" "}
                <span className="my-bag-quantity">
                  {this.totalNumberOfItems} items
                </span>
              </h2>
              {this.allCartItems.map((cartItem, i) => (
                <CartItem
                  key={i}
                  cartItem={cartItem}
                  cartItemID={`${i}-${cartItem.name.replaceAll(" ", "-")}`}
                  updateCartState={this.updateCartState}
                />
              ))}
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
          ) : (
            <h2 className="empty-cart-indicator-header">Cart is empty</h2>
          )}
        </div>
        <div className="blur-out-background"></div>
      </>
    );
  }
}

export default CartDropdown;
