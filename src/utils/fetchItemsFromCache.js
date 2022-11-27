const fetchItemsFromCache = () => {
  return JSON.parse(localStorage.getItem("items")) || [];
};

export default fetchItemsFromCache;
