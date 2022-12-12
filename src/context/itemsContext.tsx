import React from "react";
import ProviderChildType from "../interfaces/providerChild";
import SelectedItem from "../interfaces/selectedItem";

type CurrentItemsType = {
  selectedItems: SelectedItem[] | [];
  setItems: (item: SelectedItem[]) => void;
}

const ItemsContext = React.createContext<CurrentItemsType>({
  selectedItems: [],
  setItems: () => {}
});

export const ItemsConsumer = ItemsContext.Consumer;

export class ItemsProvider extends React.Component<ProviderChildType> {
  state = {
    selectedItems: []
  };

  setItems = (item: SelectedItem[]) => {
    this.setState({
      ...this.state,
      selectedItems: item,
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
