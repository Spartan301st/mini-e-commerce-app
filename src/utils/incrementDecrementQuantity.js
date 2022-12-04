import setItemsToCache from "./setItemsToCache";

const incrementDecrementQuantity = (
  procedureName,
  selectedItems,
  cartItem,
  setItems
) => {
  // reassign selectedItems
  let allCartItems = selectedItems;
  // loop through the items
  allCartItems.some((item, i) => {
    if (
      // if there is an item with the same selected attribute values
      item.name === cartItem.name &&
      JSON.stringify(item.selectedAttributes) ===
        JSON.stringify(cartItem.selectedAttributes)
    ) {
      // when + button was pressed
      if (procedureName === "increment") {
        allCartItems[i].quantity++;
      }
      // when - button was pressed and there is only 1 such item was selected, remove the item from the cart list
      else if (
        procedureName === "decrement" &&
        allCartItems[i].quantity === 1
      ) {
        // remove item from the list
        allCartItems.splice(i, 1);
      }
      // when - button was pressed and there was > 1 such item selected
      else {
        allCartItems[i].quantity--;
      }
    }
    return null;
  });
  setItemsToCache(allCartItems);
  setItems(allCartItems);
};

export default incrementDecrementQuantity;
