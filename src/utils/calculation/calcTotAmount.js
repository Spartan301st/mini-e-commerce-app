const calcTotAmount = (allCartItems, selectedCurrency) => {
  let totalAmount = 0;
  if (allCartItems.length) {
    for (let item of allCartItems) {
      for (let price of item.prices) {
        if (price.currency.symbol === selectedCurrency.symbol) {
          totalAmount += price.amount * item.quantity;
        }
      }
    }
  }
  return Number(totalAmount.toFixed(2));
};

export default calcTotAmount;
