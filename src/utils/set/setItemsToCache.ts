import SelectedItem from "../../interfaces/selectedItem";

const setItemsToCache = (allCartItems: SelectedItem[]) => {
  return localStorage.setItem("items", JSON.stringify(allCartItems));
};

export default setItemsToCache;
