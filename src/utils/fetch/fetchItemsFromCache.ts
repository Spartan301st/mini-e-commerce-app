import SelectedItem from "../../interfaces/selectedItem";

const fetchItemsFromCache = (): SelectedItem[] | [] => {
  const items = localStorage.getItem("items");
  return items?.length ? JSON.parse(items) : [];

  // return items && items.length ? JSON.parse(items) : [];
  // might need to check for returned string
  // return JSON.parse(localStorage.getItem("items") || "") || [];
};

export default fetchItemsFromCache;
