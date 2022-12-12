import SelectedItem from "../../interfaces/selectedItem";

const fetchItemsFromCache = (): SelectedItem[] | [] => {
  const items = localStorage.getItem("items");
  return items?.length ? JSON.parse(items) : [];
};

export default fetchItemsFromCache;
