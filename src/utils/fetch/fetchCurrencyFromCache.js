const fetchCurrencyFromCache = () => {
  return JSON.parse(localStorage.getItem("currency")) || [];
};

export default fetchCurrencyFromCache;
