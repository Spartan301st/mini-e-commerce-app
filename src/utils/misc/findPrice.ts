import Currency from "../../interfaces/currency";
import ProductInteface from "../../interfaces/product";
import SelectedItem from "../../interfaces/selectedItem";

const findPrice = (
  product: ProductInteface | SelectedItem,
  selectedCurrency: Currency
) => {
  return product.prices.find(
    (price) => price.currency.symbol === selectedCurrency.symbol
  );
};

export default findPrice;
