import React from "react";
import "./CartLinks.scss";
import { BsCart2 } from "react-icons/bs";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

import CurrencyDropdown from "../CurrencyDropdown/CurrencyDropdown";
import CartDropdown from "./CartDropdown/CartDropdown";
import { CurrencyConsumer } from "../../../context/currencyContext";
import ItemsContext from "../../../context/itemsContext";
import fetchItemsFromCache from "../../../utils/fetchItemsFromCache";
import calcTotItems from "../../../utils/calculation/calcTotItems";

class CartLinks extends React.Component {
  constructor(props) {
    super(props);

    // get all available currencies
    const { currencies } = props;
    this.currencies = currencies;

    // get last selected currency or set new one if non was selected earlier
    const lastSelectedCurrency =
      JSON.parse(localStorage.getItem("currency")) || false;

    if (!lastSelectedCurrency) {
      localStorage.setItem("currency", JSON.stringify(currencies[0]));
    }

    // count total number of items selected
    this.totalItems =
      JSON.parse(localStorage.getItem("items"))?.reduce(
        (acc, item) => acc + item.quantity,
        0
      ) || 0;

    // component state
    this.state = {
      currencyDropdownVisible: false,
      cartDropdownVisible: false,
      selectedCurrency: lastSelectedCurrency || this.currencies[0],
    };

    // for displaying/hiding dropdown menus
    this.toggleDropdownVisibility = this.toggleDropdownVisibility.bind(this);

    // for instantly reflecting currency change
    this.updateSelectedCurrency = this.updateSelectedCurrency.bind(this);
  }

  toggleDropdownVisibility(menuName) {
    if (menuName === "currency") {
      this.setState({
        currencyDropdownVisible: !this.state.currencyDropdownVisible,
      });
    } else {
      this.setState({
        cartDropdownVisible: !this.state.cartDropdownVisible,
      });
    }
  }

  updateSelectedCurrency(newCurrency) {
    localStorage.setItem("currency", JSON.stringify(newCurrency));
  }

  render() {
    return (
      <div className="card-links-container">
        {/* currency related */}
        <div className="nav-currency-dropdown-container">
          <div
            className="dropdown-arrow-container"
            onClick={() => this.toggleDropdownVisibility("currency")}
          >
            <CurrencyConsumer>
              {(value) => {
                const { currentCurrency } = value;
                return (
                  <span className="dropdown-currency-symbol">
                    {/* update currency selected without refreshing*/}
                    {Object.keys(currentCurrency).length
                      ? currentCurrency.symbol
                      : this.state.selectedCurrency.symbol}
                  </span>
                );
              }}
            </CurrencyConsumer>

            {!this.state.currencyDropdownVisible && <FiChevronDown />}
            {this.state.currencyDropdownVisible && <FiChevronUp />}
          </div>
          {this.state.currencyDropdownVisible && (
            <CurrencyDropdown
              currencies={this.currencies}
              updateSelectedCurrency={this.updateSelectedCurrency}
            />
          )}
        </div>
        {/* cart related */}
        <div
          className="nav-cart-icon-container"
          onClick={() => this.toggleDropdownVisibility("cart")}
        >
          <ItemsContext>
            {(value) => {
              const { selectedItems } = value;

              // assign all selected cart items
              const allCartItems = selectedItems.length
                ? selectedItems
                : fetchItemsFromCache();
              const totalNumberOfItems = calcTotItems(allCartItems);
              return (
                allCartItems.length && (
                  <div className="cart-item-quantity-notifier">
                    {totalNumberOfItems}
                  </div>
                )
              );
            }}
          </ItemsContext>
          <BsCart2 className="nav-cart-icon" />
          {this.state.cartDropdownVisible && <CartDropdown />}
        </div>
      </div>
    );
  }
}
export default CartLinks;
