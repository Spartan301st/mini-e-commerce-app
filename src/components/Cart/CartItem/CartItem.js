import React from "react";
import "./CartItem.scss";

class CartItem extends React.Component {
  constructor(props) {
    super(props);
    const { cartItem, cartItemID, updateCartState } = this.props;
    this.state = {
      cartItem: cartItem,
      cartItemID: cartItemID,
    };
    this.updateCartState = updateCartState;

    this.incrementDecrementQuantity =
      this.incrementDecrementQuantity.bind(this);
  }

  incrementDecrementQuantity(procedureName) {
    let allCartItems = JSON.parse(localStorage.getItem("items")) || false;
    // if there is an item with the same selected attribute values
    // console.log("allCartItems", allCartItems);
    // const found = allCartItems.find(
    //   (item) =>
    //     item.name === this.state.cartItem.name &&
    //     JSON.stringify(item.selectedAttributes) ===
    //       JSON.stringify(this.state.cartItem.selectedAttributes)
    // );

    // console.log("allCartItems before increment", allCartItems);
    allCartItems.some((item, i) => {
      if (
        item.name === this.state.cartItem.name &&
        JSON.stringify(item.selectedAttributes) ===
          JSON.stringify(this.state.cartItem.selectedAttributes)
      ) {
        if (procedureName === "increment") {
          // when + button was pressed
          allCartItems[i].quantity++;
        } else if (
          procedureName === "decrement" &&
          allCartItems[i].quantity === 1
        ) {
          // when - button was pressed and there only 1 such item was selected, remove the item from the cart list
          allCartItems.splice(i, 1);
          // empty out the current cart item to reflect the changes
          return this.setState({ cartItem: "" });
        } else {
          // when - button was pressed and there was > 1 such item selected
          allCartItems[i].quantity--;
        }
        // for reflecting quantity changes
        return this.setState({ cartItem: item });
      }
      return null;
    });

    localStorage.setItem("items", JSON.stringify(allCartItems));
    this.updateCartState(allCartItems);
  }
  render() {
    const selectedCurrency =
      JSON.parse(localStorage.getItem("currency")) || false;

    const price = this.state.cartItem?.prices?.find(
      (price) => price.currency.symbol === selectedCurrency.symbol
    );

    const { allAttributes, selectedAttributes } = this.state.cartItem;

    if (this.state.cartItem)
      return (
        <>
          <div className="cart-item-details-container">
            {/* left details */}
            <div className="left-cart-details-container">
              <div className="brand-naming-container">
                <h2>{this.state.cartItem.brand}</h2>
                <h3>{this.state.cartItem.name}</h3>
              </div>

              <div className="cart-item-price-container">
                <p className="cart-item-price">
                  {price.currency.symbol}
                  {price.amount}
                </p>
              </div>
              {allAttributes.map((attribute) => {
                let itemValue = selectedAttributes[attribute.id];
                return (
                  <div className="attribute-container" key={attribute.id}>
                    <h4 className="details-header">{attribute.name}:</h4>
                    <div className="attribute-values">
                      {attribute.items.map((item) => {
                        if (attribute.type === "text") {
                          return (
                            <div
                              className="text-attribute-container"
                              key={item.displayValue}
                            >
                              <div>
                                <input
                                  id={`${this.state.cartItemID}-${attribute.id}-${item.value}`}
                                  type="radio"
                                  value={item.value}
                                  className="text-attribute-input"
                                  defaultChecked={item.value === itemValue}
                                  name={`${this.state.cartItemID}-${attribute.id}`}
                                  required
                                  disabled
                                />
                                <label
                                  className={`${
                                    item.value === itemValue ? "checked " : ""
                                  }text-attribute-label`}
                                  htmlFor={`${this.state.cartItemID}-${attribute.id}-${item.value}`}
                                >
                                  {item.value}
                                </label>
                              </div>
                            </div>
                          );
                        } else {
                          return (
                            <div
                              className="swatch-attribute-container"
                              key={item.displayValue}
                            >
                              <input
                                id={`${this.state.cartItemID}-${attribute.id}-${item.value}`}
                                type="radio"
                                value={item.value}
                                className="swatch-attribute-input"
                                defaultChecked={item.value === itemValue}
                                name={`${this.state.cartItemID}-${attribute.id}`}
                                required
                                disabled
                              />
                              <label
                                className={`${
                                  item.value === itemValue ? "checked " : ""
                                }swatch-attribute-label`}
                                htmlFor={`${this.state.cartItemID}-${attribute.id}-${item.value}`}
                                style={{ backgroundColor: item.value }}
                              ></label>
                            </div>
                          );
                        }
                      })}
                    </div>
                  </div>
                );
              })}
              <div>{}</div>
            </div>
            <div className="right-cart-details-container">
              <div className="cart-item-amount-increment-container">
                <button
                  onClick={() => this.incrementDecrementQuantity("increment")}
                >
                  +
                </button>
                <p>{this.state.cartItem.quantity}</p>
                <button
                  onClick={() => this.incrementDecrementQuantity("decrement")}
                >
                  -
                </button>
              </div>
              <div className="cart-item-img-container">
                <img
                  src={this.state.cartItem.imageURL}
                  alt={this.state.cartItem.name}
                />
              </div>
            </div>
          </div>
        </>
      );
  }
}

export default CartItem;
