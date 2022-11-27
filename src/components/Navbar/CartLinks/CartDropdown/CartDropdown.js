import React from "react";
import "./CartDropdown.scss";
import { NavLink } from "react-router-dom";
import CartItem from "../../../Cart/CartItem/CartItem";
import { ItemsConsumer } from "../../../../context/itemsContext";
import fetchItemsFromCache from "../../../../utils/fetchItemsFromCache";
import calcTotItems from "../../../../utils/calculation/calcTotItems";
import { CurrencyConsumer } from "../../../../context/currencyContext";
import fetchCurrencyFromCache from "../../../../utils/fetchCurrencyFromCache";
import calcTotAmount from "../../../../utils/calculation/calcTotAmount";

// note that CartDropdown extends Cart, therefore we have access to its props, that are used below
class CartDropdown extends React.Component {
  render() {
    return (
      <>
        <div className="cart-dropdown-container">
          <ItemsConsumer>
            {(value) => {
              const { setItems, selectedItems } = value;

              // assign all selected cart items
              const allCartItems = selectedItems.length
                ? selectedItems
                : fetchItemsFromCache();
              // calculate total number of items according all the selected items
              const totalNumberOfItems = calcTotItems(allCartItems);

              return allCartItems.length ? (
                <div className="cart-dropdown-info-container">
                  <h2 className="my-bag">
                    My bag,{" "}
                    <span className="my-bag-quantity">
                      {totalNumberOfItems} items
                    </span>
                  </h2>
                  <CurrencyConsumer>
                    {(value) => {
                      const { currentCurrency } = value;
                      const selectedCurrency = Object.keys(currentCurrency)
                        .length
                        ? currentCurrency
                        : fetchCurrencyFromCache();

                      const totalAmount = calcTotAmount(
                        allCartItems,
                        selectedCurrency
                      );
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
                          <div className="total-price">
                            <span>Total</span>
                            <span>
                              {selectedCurrency.symbol}
                              {totalAmount}
                            </span>
                          </div>
                        </>
                      );
                    }}
                  </CurrencyConsumer>
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
              );
            }}
          </ItemsConsumer>
        </div>
        <div className="blur-out-background"></div>
      </>
    );
  }
}

export default CartDropdown;
