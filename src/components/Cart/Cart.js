import React from "react";
import "./Cart.scss";

import CartItem from "./CartItem/CartItem";
// import { connect } from "react-redux";

// const mapStateToProps = (state) => {
//   console.log(state);
//   return {};
// };

class CartDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.allCartItems = JSON.parse(localStorage.getItem("items")) || false;
    this.selectedCurrency = JSON.parse(localStorage.getItem("currency"));

    // const itemPrices = allCartItems.forEach((item) => item.prices)
    // TODO: HERE TEST
    // const itemPrices = allCartItems.forEach((item) => item.prices);
    this.totalAmount = 0;
    if (this.allCartItems) {
      for (let item of this.allCartItems) {
        for (let price of item.prices) {
          if (price.currency.symbol === this.selectedCurrency.symbol) {
            this.totalAmount += price.amount;
          }
        }
      }
    }
    this.totalAmount = Number(this.totalAmount.toFixed(2));
    this.taxAmount = Number((this.totalAmount * 0.21).toFixed(2));

    if (this.allCartItems) {
      this.totalNumberOfItems =
        this.allCartItems?.reduce((acc, item) => acc + item.quantity, 0) || 0;
    }

    // console.log(this.totalAmount);
    // .forEach((pricesGroup) => console.log(...pricesGroup));
    // .map((prices) => prices);
    // itemPrices.forEach((pricesGroup, i) => console.log(pricesGroup[i], i));
    // console.log(itemPrices);

    // const currentCurrencyPrices = itemPrices.map(
    //   (itemPriceGroup) =>
    //     itemPriceGroup.filter((price) => price.currency === selectedCurrency)
    // itemPrice.find(
    //   // (price) => price.currency.symbol === selectedCurrency.symbol
    //   (price) => {
    //     console.log(price);
    //     return price.currency;
    //   }
    // )
    // price.currency.symbol === selectedCurrency.symbol && price.amount
    // );

    // console.log("currentCurrencyPrices", currentCurrencyPrices);

    // const totalAmount = currentCurrencyPrices.reduce(
    //   (totalAmount, price) => totalAmount + price.amount,
    //   0
    // );
    // console.log("totalAmount", totalAmount);

    // let totalPrice = allCartItems.reduce(
    //   (totalPrice, cartItem) => totalPrice.push(cartItem),
    //   []
    // );
    // console.log(totalPrice);
    // console.log("this.state", this.state);
    // console.log("allCartItems", allCartItems.allAttributes);
    // console.log("allCartItems", allCartItems[0].allAttributes);
    // console.log("allCartItems", allCartItems[0].selectedAttributes);
    // allCartItems.forEach((item) => {
    //   const { allAttributes, selectedAttributes } = item;
    //   allAttributes.forEach((attribute) => {
    //     console.log(attribute.id, attribute.items);
    //     let itemValue = selectedAttributes[attribute.id];
    //     attribute.items.forEach((item) => {
    //       if (item.value === itemValue) {
    //         console.log("item", item);
    //       }
    //     });
    //     // if(attribute.id == selectedAttributes)
    //   });
    //   // console.log(allAttributes);
    //   console.log(selectedAttributes);
    //   console.log("===");
    // });
  }

  render() {
    return (
      <div className="cart-container">
        {this.allCartItems ? (
          <>
            <h2 className="cart-header">Cart</h2>
            {this.allCartItems.map((cartItem, i) => (
              <CartItem
                key={i}
                cartItem={cartItem}
                cartItemID={`${i}-${cartItem.name.replaceAll(" ", "-")}`}
              />
            ))}

            <h3>
              Tax 21%: {this.selectedCurrency.symbol}
              {this.taxAmount}
            </h3>
            <p>Quantity: {this.totalNumberOfItems}</p>
            <p>
              Total: {this.selectedCurrency.symbol}
              {this.totalAmount}
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
          "Empty Cart"
        )}
      </div>
    );
  }
}

// export default connect(mapStateToProps)(Cart);
export default CartDropdown;
