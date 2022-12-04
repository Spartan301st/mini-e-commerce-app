const findPrice = (product, selectedCurrency) => {
  return product.prices.find(
    (price) => price.currency.symbol === selectedCurrency.symbol
  );
};

export default findPrice;
