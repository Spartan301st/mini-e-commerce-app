import Currency from "../../interfaces/currency";
import ProductInteface from "../../interfaces/product";

const findPrice = (product: ProductInteface, selectedCurrency: Currency) => {
  return product.prices.find(
    (price) => price.currency.symbol === selectedCurrency.symbol
  );
};

export default findPrice;
