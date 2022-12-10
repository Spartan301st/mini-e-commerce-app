import React from "react";
import "./CartLinks.scss";
import { BsCart2 } from "react-icons/bs";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import CurrencyDropdown from "../CurrencyDropdown/CurrencyDropdown";
import CartDropdown from "./CartDropdown/CartDropdown";
import { CurrencyConsumer } from "../../../context/currencyContext";
import { ItemsConsumer } from "../../../context/itemsContext";
import fetchItemsFromCache from "../../../utils/fetch/fetchItemsFromCache";
import calcTotItems from "../../../utils/calculation/calcTotItems";
import fetchCurrencyFromCache from "../../../utils/fetch/fetchCurrencyFromCache";
import setCurrencyToCache from "../../../utils/set/setCurrencyToCache";
import Currencies from "../../../interfaces/currencies";
import Currency from "../../../interfaces/currency";

class CartLinks extends React.Component<Currencies> {
  currencies;
  state;
  constructor(props: Currencies) {
    super(props);

    // get all available currencies
    const { currencies } = this.props;
    this.currencies = currencies;
      
    if (!Object.keys(fetchCurrencyFromCache()).length) {
      setCurrencyToCache(currencies[0]);
    }

    this.state = {
      currencyDropdownVisible: false,
      cartDropdownVisible: false,
    };

    // for displaying/hiding dropdown menus
    this.toggleDropdownVisibility = this.toggleDropdownVisibility.bind(this);
  }

  toggleDropdownVisibility(menuName: string) {
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

  render() {
    return (
      <div className="cartlinks">
        {/* currency related */}
        <div className="cartlinks__currencyContainer">
          <div
            className="cartlinks__selectedCurrencyContainer"
            onClick={() => this.toggleDropdownVisibility("currency")}
          >
            <CurrencyConsumer>
              {(value) => {
                const { currentCurrency } = value;
                return (
                  <span className="cartlinks__selectedCurrency">
                    {/* update selected currency*/}
                    {(Object.keys(currentCurrency).length)
                    // definitely should be of type Currency and not empty obj
                      ? (currentCurrency as Currency).symbol
                      : fetchCurrencyFromCache().symbol}
                  </span>
                );
              }}
            </CurrencyConsumer>

            {!this.state.currencyDropdownVisible && (
              <FiChevronDown className="chevron-icon" />
            )}
            {this.state.currencyDropdownVisible && (
              <FiChevronUp className="chevron-icon" />
            )}
          </div>
          {this.state.currencyDropdownVisible && (
            <CurrencyDropdown currencies={this.currencies} />
          )}
        </div>
        {/* cart related */}
        <div
          className="cartlinks__cartIconContainer"
          onClick={() => this.toggleDropdownVisibility("cart")}
        >
          <BsCart2 className="cartlinks__cartIcon" />

          <ItemsConsumer>
            {(value) => {
              const { selectedItems } = value;

              // assign all selected cart items
              const allCartItems = selectedItems.length
                ? selectedItems
                : fetchItemsFromCache();
              const totalNumberOfItems = calcTotItems(allCartItems);
              return (
                totalNumberOfItems > 0 && (
                  <div
                    className="cartlinks__itemQuantityNotifier"
                    onClick={() => this.toggleDropdownVisibility("cart")}
                  >
                    <span className="cartlinks__itemQuantity">
                      {totalNumberOfItems}
                    </span>
                  </div>
                )
              );
            }}
          </ItemsConsumer>
        </div>
        {this.state.cartDropdownVisible && (
          <CartDropdown
            toggleDropdownVisibility={this.toggleDropdownVisibility}
          />
        )}
      </div>
    );
  }
}
export default CartLinks;
