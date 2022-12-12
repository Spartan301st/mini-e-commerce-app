import React from "react";

const CurrencyContext = React.createContext();

export const CurrencyConsumer = CurrencyContext.Consumer;

export class CurrencyProvider extends React.Component {
  state = {
    currentCurrency: {},
  };
  setCurrentCurrency = (currency) => {
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
