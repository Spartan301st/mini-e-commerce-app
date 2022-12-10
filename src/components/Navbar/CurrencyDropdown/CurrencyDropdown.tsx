import React from "react";
import { CurrencyConsumer } from "../../../context/currencyContext";
import Currencies from "../../../interfaces/currencies";
import setCurrencyToCache from "../../../utils/set/setCurrencyToCache";
import "./CurrencyDropdown.scss";

class CurrencyDropdown extends React.Component<Currencies> {
  render() {
    const { currencies } = this.props;
    return (
      <CurrencyConsumer>
        {(value) => {
          // for setting a currency on the global context
          const { setCurrentCurrency } = value;
          return (
            <div className="currencyDropdown">
              {currencies.map((currency) => (
                <div
                  key={currency.label}
                  className="currencyDropdown__currencyOption"
                  onClick={() => {
                    setCurrencyToCache(currency);
                    setCurrentCurrency(currency);
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
