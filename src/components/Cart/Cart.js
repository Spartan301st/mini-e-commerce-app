import React from "react";
import { CurrencyConsumer } from "../../context/currencyContext";
import { ItemsConsumer } from "../../context/itemsContext";
import calcTaxAmount from "../../utils/calculation/calcTaxAmount";
import calcTotAmount from "../../utils/calculation/calcTotAmount";
import calcTotItems from "../../utils/calculation/calcTotItems";
import fetchCurrencyFromCache from "../../utils/fetchCurrencyFromCache";
import fetchItemsFromCache from "../../utils/fetchItemsFromCache";
import "./Cart.scss";

import CartItem from "./CartItem/CartItem";

class CartDropdown extends React.Component {
  render() {
    return (
      <div className="cart-container">
        <ItemsConsumer>
          {(value) => {
            // to set items on the global context
            const { setItems, selectedItems } = value;

            // assign all selected cart items
            const allCartItems = selectedItems.length
              ? selectedItems
              : fetchItemsFromCache();
            // calculate total number of items according all the selected items
            const totalNumberOfItems = calcTotItems(allCartItems);

            return allCartItems.length ? (
              <>
                <h2 className="cart-header">Cart</h2>
                <CurrencyConsumer>
                  {(value) => {
                    const { currentCurrency } = value;

                    // determine the selected currency. We check for currecy saved in Consumer first to instantly reflect the changes on changes without a need of refreshing window and only use cache data as a fallback in case if the window was refreshed
                    const selectedCurrency = Object.keys(currentCurrency).length
                      ? currentCurrency
                      : fetchCurrencyFromCache();
                    const totalAmount = calcTotAmount(
                      allCartItems,
                      selectedCurrency
                    );
                    const taxAmount = calcTaxAmount(totalAmount);

                    return (
                      <>
                        {allCartItems.map((cartItem, i) => (
                          <CartItem
                            key={i}
                            cartItem={cartItem}
                            cartItemID={`${i}-${cartItem.name.replaceAll(
                              " ",
                              "-"
                            )}`}
                            setItems={setItems}
                            selectedItems={allCartItems}
                            selectedCurrency={selectedCurrency}
                          />
                        ))}
                        <h3>
                          Tax 21%: {selectedCurrency.symbol}
                          {taxAmount}
                        </h3>
                        <p>Quantity: {totalNumberOfItems}</p>
                        <p>
                          Total: {selectedCurrency.symbol}
                          {totalAmount}
                        </p>
                      </>
                    );
                  }}
                </CurrencyConsumer>
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
            );
          }}
        </ItemsConsumer>
      </div>
    );
  }
}

export default CartDropdown;
