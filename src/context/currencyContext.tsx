import React from "react";
import Currency from "../interfaces/currency";
import ProviderChildType from "../interfaces/providerChild";

type CurrentCurrencyType = {
  currentCurrency: Currency | {};
  setCurrentCurrency: (currency: Currency) => void;
};
const CurrencyContext = React.createContext<CurrentCurrencyType>({
  currentCurrency: {},
  setCurrentCurrency: () => {}
});


export const CurrencyConsumer = CurrencyContext.Consumer;

export class CurrencyProvider extends React.Component<ProviderChildType> {
  state = {
    currentCurrency: {}
  };
  setCurrentCurrency = (currency: Currency) => {
    this.setState({ ...this.state, currentCurrency: currency });
  };

  render() {
    const { currentCurrency } = this.state;
    const { setCurrentCurrency } = this;
    return (
      // wrap child elements with the provider enable them access the current selected currency within the state and corresponding setter for it
      <CurrencyContext.Provider
        value={{
          currentCurrency,
          setCurrentCurrency,
        }}
      >
        {this.props.children}
      </CurrencyContext.Provider>
    );
  }
}

export default CurrencyContext;
