import Currency from "../../interfaces/currency";

const setCurrencyToCache = (newCurrency: Currency) => {
  return localStorage.setItem("currency", JSON.stringify(newCurrency));
};

export default setCurrencyToCache;
