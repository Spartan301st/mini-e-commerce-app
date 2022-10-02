import React from "react";
import "./Cart.scss";

import CartItem from "./CartItem/CartItem";

class CartDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.allCartItems = JSON.parse(localStorage.getItem("items")) || false;
    this.selectedCurrency = JSON.parse(localStorage.getItem("currency"));

    this.totalAmount = 0;
    if (this.allCartItems.length) {
      for (let item of this.allCartItems) {
        for (let price of item.prices) {
          if (price.currency.symbol === this.selectedCurrency.symbol) {
            this.totalAmount += price.amount * item.quantity;
          }
        }
      }
    }
    this.totalAmount = Number(this.totalAmount.toFixed(2));
    this.taxAmount = Number((this.totalAmount * 0.21).toFixed(2));
    this.totalNumberOfItems =
      this.allCartItems?.reduce((acc, item) => acc + item.quantity, 0) || 0;

    this.state = {
      totalAmount: this.totalAmount,
      taxAmount: this.taxAmount,
      totalNumberOfItems: this.totalNumberOfItems,
    };

    this.updateCartState = this.updateCartState.bind(this);
  }

  updateCartState(allCartItems) {
    let totalAmount = 0;
    if (allCartItems.length) {
      for (let item of allCartItems) {
        for (let price of item.prices) {
          if (price.currency.symbol === this.selectedCurrency.symbol) {
            totalAmount += price.amount * item.quantity;
          }
        }
      }
    }
    this.setState({
      totalAmount: Number(totalAmount.toFixed(2)),
      taxAmount: Number((Number(totalAmount.toFixed(2)) * 0.21).toFixed(2)),
      totalNumberOfItems:
        allCartItems?.reduce((acc, item) => acc + item.quantity, 0) || 0,
    });
  }

  render() {
    return (
      <div className="cart-container">
        {this.state.totalNumberOfItems ? (
          <>
            <h2 className="cart-header">Cart</h2>
            {this.allCartItems.map((cartItem, i) => (
              <CartItem
                key={i}
                cartItem={cartItem}
                cartItemID={`${i}-${cartItem.name.replaceAll(" ", "-")}`}
                updateCartState={this.updateCartState}
              />
            ))}

            <h3>
              Tax 21%: {this.selectedCurrency.symbol}
              {this.state.taxAmount}
            </h3>
            <p>Quantity: {this.state.totalNumberOfItems}</p>
            <p>
              Total: {this.selectedCurrency.symbol}
              {this.state.totalAmount}
            </p>
            <button
              type="submit"
              className="btn order-btn"
              onClick={() => alert("Purchased successfully")}
            >
              Order
            </button>
          </>
        ) : (
          <h3>Cart is empty</h3>
        )}
      </div>
    );
  }
}

export default CartDropdown;
