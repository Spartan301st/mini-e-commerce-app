const calcTotItems = (allCartItems) => {
  return allCartItems?.reduce((acc, item) => acc + item.quantity, 0) || 0;
};

export default calcTotItems;
