import React from "react";
import "./CartLinks.scss";
import { BsCart2 } from "react-icons/bs";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

import CurrencyDropdown from "../CurrencyDropdown/CurrencyDropdown";
import CartDropdown from "./CartDropdown/CartDropdown";

class CartLinks extends React.Component {
  constructor(props) {
    super(props);

    // get all available currencies
    const { currencies } = props;
    this.currencies = currencies;

    // get last selected currency or set new one if non was selected earlies
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
    // refresh page to reflect currency changes for all products
    window.location.reload(false);
  }

  render() {
    return (
      <div className="card-links-container">
        <div className="nav-currency-dropdown-container">
          <div
            className="dropdown-arrow-container"
            onClick={() => this.toggleDropdownVisibility("currency")}
          >
            <p className="dropdown-currency-symbol">
              {this.state.selectedCurrency.symbol}
            </p>
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
        <div
          className="nav-cart-icon-container"
          onClick={() => this.toggleDropdownVisibility("cart")}
        >
          {this.totalItems > 0 && (
            <div className="cart-item-quantity-notifier">{this.totalItems}</div>
          )}
          <BsCart2 className="nav-cart-icon" />
          {this.state.cartDropdownVisible && <CartDropdown />}
        </div>
      </div>
    );
  }
}
export default CartLinks;
