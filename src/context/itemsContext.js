import React from "react";

const ItemsContext = React.createContext();

export const ItemsConsumer = ItemsContext.Consumer;

export class ItemsProvider extends React.Component {
  state = {
    selectedItems: [],
  };

  setItems = (item) => {
    this.setState({
      ...this.state,
      selectedItems: [...this.state.selectedItems, item],
    });
  };

  render() {
    const { selectedItems } = this.state;
    const { setItems } = this;
    return (
      // wrap child elements with the provider enable them access the current selected currency within the state and corresponding setter for it
      <ItemsContext.Provider
        value={{
          selectedItems,
          setItems,
        }}
      >
        {this.props.children}
      </ItemsContext.Provider>
    );
  }
}

export default ItemsContext;
