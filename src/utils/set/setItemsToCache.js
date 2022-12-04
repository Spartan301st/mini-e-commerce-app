const setItemsToCache = (allCartItems) => {
  return localStorage.setItem("items", JSON.stringify(allCartItems));
};

export default setItemsToCache;
