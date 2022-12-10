import React from "react";
import Currency from "../interfaces/currency";
import ProviderChildType from "../interfaces/providerChild";

type CurrentCurrencyType = {
  currentCurrency: Currency | {};
  setCurrentCurrency: (currency: Currency) => void;
};

// type ProviderChildType = {
//   children: React.ReactNode
// }
// type ProviderChildType = {
//   children: JSX.Element;
// }
// interface ProviderChildType extends PropsWithChildren {};

// const CurrencyContext = React.createContext<CurrentCurrencyType | null>(null);
const CurrencyContext = React.createContext<CurrentCurrencyType>({
  currentCurrency: {},
  // currentCurrency: {
  //   label: "",
  //     symbol: "",
  // },
  setCurrentCurrency: () => {}
});


export const CurrencyConsumer = CurrencyContext.Consumer;

export class CurrencyProvider extends React.Component<ProviderChildType> {
  state = {
    currentCurrency: {}
    // currentCurrency: {
    //   label: "",
    //   symbol: "",
    // },
  };
  setCurrentCurrency = (currency: Currency) => {
    // this.setState(() => ({ currentCurrency: currency }));
    // this.setState({ currentCurrency: currency });
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
        {/* {this.props.children} */}
        {this.props.children}
      </CurrencyContext.Provider>
    );
  }
}

export default CurrencyContext;
