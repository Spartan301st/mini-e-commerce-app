import React from "react";
import { CurrencyConsumer } from "../../context/currencyContext";
import { ItemsConsumer } from "../../context/itemsContext";
import calcTaxAmount from "../../utils/calculation/calcTaxAmount";
import calcTotAmount from "../../utils/calculation/calcTotAmount";
import calcTotItems from "../../utils/calculation/calcTotItems";
import fetchCurrencyFromCache from "../../utils/fetch/fetchCurrencyFromCache";
import fetchItemsFromCache from "../../utils/fetch/fetchItemsFromCache";
import "./Cart.scss";

import CartItem from "../CartItem/CartItem";

class CartDropdown extends React.Component {
  render() {
    return (
      <main className="cart maxWidthLimiter">
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
                <h2 className="cart__header">Cart</h2>
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
                        <div className="cart__cartItemsContainer">
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
                              componentName="cart"
                            />
                          ))}
                        </div>
                        <div className="cart__summingDetails">
                          <h3 className="cart__tax">
                            Tax 21%:
                            <span className="cart__taxAmount">
                              {selectedCurrency.symbol}
                              {taxAmount}
                            </span>
                          </h3>
                          <h3 className="cart__totalQuantity">
                            Quantity:
                            <span className="cart__totalQuantityNumber">
                              {totalNumberOfItems}
                            </span>
                          </h3>
                          <h2 className="cart__total">
                            Total:
                            <span className="cart__totalAmount">
                              {selectedCurrency.symbol}
                              {totalAmount}
                            </span>
                          </h2>
                        </div>
                      </>
                    );
                  }}
                </CurrencyConsumer>
                <button
                  type="submit"
                  className="btn--green cart__submitBtn"
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
      </main>
    );
  }
}

export default CartDropdown;
