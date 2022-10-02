import React from "react";
import "./CurrencyDropdown.scss";

class CurrencyDropdown extends React.Component {
  render() {
    const { currencies, updateSelectedCurrency } = this.props;
    return (
      <div className="currencies-dropdown-container">
        {currencies.map((currency) => (
          <div
            key={currency.label}
            className="currency-option"
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
