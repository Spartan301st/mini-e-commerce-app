import React from "react";
import "./CurrencyDropdown.scss";

class CurrencyDropdown extends React.Component {
  render() {
    const { currencies, updateSelectedCurrency } = this.props;
    return (
      <div className="currencies-dropdown-container">
        {currencies.map((currency) => (
          <div
            className="currency-option"
            key={currency.label}
            // TODO: REMOVE LATER
            // value={`${currency.symbol}: ${currency.label}`}
            onClick={() => updateSelectedCurrency(currency)}
          >
            {currency.symbol} {currency.label}
          </div>
        ))}
      </div>
    );
  }
}

export default CurrencyDropdown;
