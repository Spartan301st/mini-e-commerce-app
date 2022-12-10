import SelectedItem from "../../interfaces/selectedItem";

const calcTotItems = (allCartItems: SelectedItem[]) => {
  return allCartItems?.reduce((acc, item) => acc + item.quantity, 0) || 0;
};

export default calcTotItems;
