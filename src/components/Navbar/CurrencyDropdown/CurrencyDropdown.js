import React from "react";
import { CurrencyConsumer } from "../../../context/currencyContext";
import "./CurrencyDropdown.scss";

class CurrencyDropdown extends React.Component {
  render() {
    const { currencies, updateSelectedCurrency } = this.props;
    return (
      <CurrencyConsumer>
        {(value) => {
          // for setting a currency on the global context
          const { setCurrentCurrency } = value;
          return (
            <div className="currencies-dropdown-container">
              {currencies.map((currency) => (
                <div
                  key={currency.label}
                  className="currency-option"
                  onClick={() => {
                    setCurrentCurrency(currency);
                    updateSelectedCurrency(currency);
                  }}
                >
                  {currency.symbol} {currency.label}
                </div>
              ))}
            </div>
          );
        }}
      </CurrencyConsumer>
    );
  }
}

export default CurrencyDropdown;
