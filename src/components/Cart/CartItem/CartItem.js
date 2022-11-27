import React from "react";
import setItemsToCache from "../../../utils/setItemsToCache";
import findPrice from "../../../utils/findPrice";
import "./CartItem.scss";

class CartItem extends React.Component {
  constructor(props) {
    super(props);
    const { cartItemID, setItems } = this.props;
    this.cartItemID = cartItemID;
    this.setItems = setItems;

    this.incrementDecrementQuantity =
      this.incrementDecrementQuantity.bind(this);
  }
  incrementDecrementQuantity(procedureName, selectedItems, cartItem) {
    // reassign selectedItems
    let allCartItems = selectedItems;
    // loop through the items
    allCartItems.some((item, i) => {
      if (
        // if there is an item with the same selected attribute values
        item.name === cartItem.name &&
        JSON.stringify(item.selectedAttributes) ===
          JSON.stringify(cartItem.selectedAttributes)
      ) {
        // when + button was pressed
        if (procedureName === "increment") {
          allCartItems[i].quantity++;
        }
        // when - button was pressed and there is only 1 such item was selected, remove the item from the cart list
        else if (
          procedureName === "decrement" &&
          allCartItems[i].quantity === 1
        ) {
          // remove item fro mthe list
          allCartItems.splice(i, 1);
        }
        // when - button was pressed and there was > 1 such item selected
        else {
          allCartItems[i].quantity--;
        }
      }
      return null;
    });
    setItemsToCache(allCartItems);
    this.setItems(allCartItems);
  }
  render() {
    const { cartItem, selectedItems, selectedCurrency } = this.props;
    const price = findPrice(cartItem, selectedCurrency);
    const { allAttributes, selectedAttributes } = cartItem;

    if (cartItem)
      return (
        <>
          <div className="cart-item-details-container">
            {/* left details */}
            <div className="left-cart-details-container">
              <div className="brand-naming-container">
                <h2>{cartItem.brand}</h2>
                <h3>{cartItem.name}</h3>
              </div>

              <div className="cart-item-price-container">
                <p className="cart-item-price">
                  {selectedCurrency.symbol}
                  {price.amount}
                </p>
              </div>
              {/* rendering corresponding attribute names of the given cart item */}
              {allAttributes.map((attribute) => {
                const itemValue = selectedAttributes[attribute.id];
                return (
                  <div className="attribute-container" key={attribute.id}>
                    <h4 className="details-header">{attribute.name}:</h4>
                    <div className="attribute-values">
                      {/* rendering corresponding attribute values for each attribute name (assuming there are only text and non-text types) */}
                      {attribute.items.map((item) => {
                        if (attribute.type === "text") {
                          return (
                            <div
                              className="text-attribute-container"
                              key={item.displayValue}
                            >
                              <div>
                                <input
                                  id={`${this.cartItemID}-${attribute.id}-${item.value}`}
                                  type="radio"
                                  value={item.value}
                                  className="text-attribute-input"
                                  defaultChecked={item.value === itemValue}
                                  name={`${this.cartItemID}-${attribute.id}`}
                                  required
                                  disabled
                                />
                                <label
                                  className={`${
                                    item.value === itemValue ? "checked " : ""
                                  }text-attribute-label`}
                                  htmlFor={`${this.cartItemID}-${attribute.id}-${item.value}`}
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
                                id={`${this.cartItemID}-${attribute.id}-${item.value}`}
                                type="radio"
                                value={item.value}
                                className="swatch-attribute-input"
                                defaultChecked={item.value === itemValue}
                                name={`${this.cartItemID}-${attribute.id}`}
                                required
                                disabled
                              />
                              <label
                                className={`${
                                  item.value === itemValue ? "checked " : ""
                                }swatch-attribute-label`}
                                htmlFor={`${this.cartItemID}-${attribute.id}-${item.value}`}
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
            </div>
            {/* right details */}
            <div className="right-cart-details-container">
              <div className="cart-item-amount-increment-container">
                <button
                  type="button"
                  onClick={() =>
                    this.incrementDecrementQuantity(
                      "increment",
                      selectedItems,
                      cartItem
                    )
                  }
                >
                  +
                </button>
                <p>{cartItem.quantity}</p>
                <button
                  type="button"
                  onClick={() =>
                    this.incrementDecrementQuantity(
                      "decrement",
                      selectedItems,
                      cartItem
                    )
                  }
                >
                  -
                </button>
              </div>
              <div className="cart-item-img-container">
                <img src={cartItem.imageURL} alt={cartItem.name} />
              </div>
            </div>
          </div>
        </>
      );
  }
}

export default CartItem;
