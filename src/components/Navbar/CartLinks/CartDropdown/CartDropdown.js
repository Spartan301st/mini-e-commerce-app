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
class CartDropdown extends React.Component {
  constructor(props) {
    super(props);
    const { toggleDropdownVisibility } = props;
    this.toggleDropdownVisibility = toggleDropdownVisibility;
  }
  render() {
    return (
      <>
        <div className="cartDropdown">
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
                <>
                  <h2 className="cartDropdown__myBagHeader">
                    My bag,{" "}
                    <span className="cartDropdown__myBagQuantity">
                      {totalNumberOfItems} item
                      {totalNumberOfItems === 1 ? "" : "s"}
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
                          <div className="cartDropdown__cartItemsContainer">
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
                          </div>
                          <div className="cartDropdown__totalPrice">
                            <span className="cartDropdown__totalTxt">
                              Total
                            </span>
                            <span className="cartDropdown__totalAmount">
                              {selectedCurrency.symbol}
                              {totalAmount}
                            </span>
                          </div>
                        </>
                      );
                    }}
                  </CurrencyConsumer>
                  <div className="cartDropdown__actions">
                    <NavLink
                      className="cartDropdown__btn btn--outline"
                      to="/cart"
                    >
                      View Bag
                    </NavLink>
                    <button
                      className="cartDropdown__btn btn--green"
                      onClick={() => alert("Purchased successfully")}
                    >
                      Check Out
                    </button>
                  </div>
                </>
              ) : (
                <h2 className="cartDropdown__emptyCartHeader">Cart is empty</h2>
              );
            }}
          </ItemsConsumer>
        </div>
        <div
          className="blur-out-background"
          onClick={() => this.toggleDropdownVisibility("cart")}
        ></div>
      </>
    );
  }
}

export default CartDropdown;
