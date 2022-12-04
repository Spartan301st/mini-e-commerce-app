const setCurrencyToCache = (newCurrency) => {
  return localStorage.setItem("currency", JSON.stringify(newCurrency));
};

export default setCurrencyToCache;
