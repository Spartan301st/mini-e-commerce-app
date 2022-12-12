import Currency from "../../interfaces/currency";

const fetchCurrencyFromCache = (): Currency => {
  const currency = localStorage.getItem("currency");
  return currency?.length ? JSON.parse(currency) : {};
};

export default fetchCurrencyFromCache;
