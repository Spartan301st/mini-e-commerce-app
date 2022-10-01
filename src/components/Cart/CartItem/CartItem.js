import React from "react";
import "./CartItem.scss";

class CartItem extends React.Component {
  constructor(props) {
    super(props);
    const { cartItem, cartItemID } = this.props;
    this.state = {
      cartItem: cartItem,
      cartItemID: cartItemID,
    };

    this.incrementDecrementQuantity =
      this.incrementDecrementQuantity.bind(this);
  }

  incrementDecrementQuantity(procedureName) {
    // console.log("procedureName: ", procedureName);
    const allCartItems = JSON.parse(localStorage.getItem("items")) || false;
    // console.log("allCartItems", allCartItems);
    // console.log("cartItem", this.cartItem);
    if (
      allCartItems &&
      allCartItems.some(
        (item) =>
          item.name === this.state.cartItem.name &&
          JSON.stringify(item.selectedAttributes) ===
            JSON.stringify(this.state.cartItem.selectedAttributes)
      )
    ) {
      if (allCartItems) {
        const modifiedQuantity = allCartItems.map((item) => {
          if (item.name === this.state.cartItem.name) {
            if (procedureName === "increment") {
              ++item.quantity;
            } else {
              --item.quantity;
            }
            console.log("item", item);
            this.setState({ cartItem: item });
            console.log("this.state", this.state);
          }

          return item;
        });

        console.log("modifiedQuantity", modifiedQuantity);
        localStorage.setItem("items", JSON.stringify(modifiedQuantity));
      }
    }
  }
  render() {
    const selectedCurrency =
      JSON.parse(localStorage.getItem("currency")) || false;
    // console.log("selectedCurrency", selectedCurrency);
    // const { cartItem, cartItemID } = this.props;
    // console.log("cartItem", cartItem);
    // console.log("cartItem", cartItem.allAttributes.length);
    const price = this.state.cartItem.prices.find(
      (price) => price.currency.symbol === selectedCurrency.symbol
    );

    const { allAttributes, selectedAttributes } = this.state.cartItem;
    // console.log("--->cartItem", cartItem);
    // allAttributes.forEach((attribute) => {
    //   console.log(attribute.id, attribute.items);
    //   let itemValue = selectedAttributes[attribute.id];
    //   attribute.items.forEach((item) => {
    //     if (item.value === itemValue) {
    //       console.log("item", item);
    //     }
    //   });
    //   // if(attribute.id == selectedAttributes)
    // });

    if (this.state.cartItem.quantity > 0)
      return (
        <>
          {/* TODO: ADD ALL THE ATTRIBUTES AND SELECTED_ATTRIBUTE_VALUE SEPARATELY WHEN SAVING THE ITEM SO WE CAN HIGHLIGHT THEM */}
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
              {/* <div
              className="text-attribute-container"
              key={item.displayValue}
            >
              <input
                id={`${attribute.id}-${item.value}`}
                type="radio"
                value={item.value}
                className="text-attribute-input"
                name={attribute.id}
                required
              />
              <label
                className="text-attribute-label"
                htmlFor={`${attribute.id}-${item.value}`}
              >
                {item.displayValue}
              </label>
            </div> */}
              {allAttributes.map((attribute) => {
                let itemValue = selectedAttributes[attribute.id];
                return (
                  <div className="attribute-container" key={attribute.id}>
                    <h4 className="details-header">{attribute.name}:</h4>
                    <div className="attribute-values">
                      {attribute.items.map((item) => {
                        // console.log("itemValue ->>", selectedAttributes);
                        // console.log("item ->>", item);
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
                                // TODO: FIX DEFAULT CHECKED VALUES
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
                      })}
                    </div>
                  </div>
                );
              })}
              {/* allAttributes.forEach((attribute) => {
              console.log(attribute.id, attribute.items);
              let itemValue = selectedAttributes[attribute.id];
              attribute.items.forEach((item) => {
                if (item.value === itemValue) {
                  console.log("item", item);
                }
              });
              // if(attribute.id == selectedAttributes)
            }); */}
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
