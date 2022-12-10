import Currency from "../../interfaces/currency";

const fetchCurrencyFromCache = (): Currency => {
  const currency = localStorage.getItem("currency");
  return currency?.length ? JSON.parse(currency) : {};

  // return currency && currency.length ? JSON.parse(currency) : [];
  // might need to check for empty string first
  // return JSON.parse(localStorage.getItem("currency") || "") || [];
};

export default fetchCurrencyFromCache;
