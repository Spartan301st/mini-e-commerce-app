import React from "react";
import "./ProductDetails.scss";
import fetchItemsFromCache from "../../../utils/fetchItemsFromCache";
import { ItemsConsumer } from "../../../context/itemsContext";
import { CurrencyConsumer } from "../../../context/currencyContext";
import fetchCurrencyFromCache from "../../../utils/fetchCurrencyFromCache";
import findPrice from "../../../utils/findPrice";

function createMarkup(markup) {
  return { __html: markup };
}

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event, product) {
    event.preventDefault();

    // all saved items from cache
    const allCartItems = fetchItemsFromCache();
    // submitted form data
    const formData = new FormData(event.currentTarget);

    // new data to be saved
    const cartProductData = {
      brand: product.brand,
      name: product.name,
      prices: product.prices,
      // imageURL: product.gallery[0],
      gallery: product.gallery,
      allAttributes: [...product.attributes],
      selectedAttributes: {},
      quantity: 0,
    };
    console.log(cartProductData.gallery);

    // add newly selected attributes to the final data to be saved
    for (let [key, value] of formData.entries()) {
      cartProductData.selectedAttributes[key] = value;
    }

    // if no cart items at all (no item was added to cart yet)
    if (!allCartItems.length) {
      cartProductData.quantity = 1;
      localStorage.setItem("items", JSON.stringify([cartProductData]));
    }
    // if there is an item with the same name and the same selected attribute values
    else if (
      allCartItems.some(
        (item) =>
          item.name === product.name &&
          JSON.stringify(item.selectedAttributes) ===
            JSON.stringify(cartProductData.selectedAttributes)
      )
    ) {
      // map through
      const modifiedQuantityItem = allCartItems.map((item) => {
        if (
          item.name === product.name &&
          JSON.stringify(item.selectedAttributes) ===
            JSON.stringify(cartProductData.selectedAttributes)
        ) {
          ++item.quantity;
        }
        return item;
      });
      localStorage.setItem("items", JSON.stringify(modifiedQuantityItem));
    }
    // if there was at least one item added to the cart and item with the new attribute values is added
    else {
      cartProductData.quantity = 1;
      localStorage.setItem(
        "items",
        JSON.stringify([...allCartItems, cartProductData])
      );
    }
  }

  render() {
    const { product } = this.props;
    return (
      <div className="product-details-container">
        <div className="brand-naming-container">
          <h2>{product.brand}</h2>
          <h3>{product.name}</h3>
        </div>
        <ItemsConsumer>
          {(value) => {
            // to set items on the global context
            const { setItems } = value;
            // form to be able to submit all the selections
            return (
              <form
                className="attributes-container"
                onSubmit={(e) => {
                  this.handleSubmit(e, product);
                  // Note: we are refetching the entire cache to save it in the global context for selected items
                  setItems(fetchItemsFromCache());
                }}
              >
                {product.attributes.map((attribute) => (
                  <div className="attribute-container" key={attribute.id}>
                    <h4 className="details-header">{attribute.name}:</h4>
                    <div className="attribute-values">
                      {attribute.items.map((item) => {
                        if (attribute.type === "text") {
                          return (
                            <div
                              className="text-attribute-container"
                              key={item.displayValue}
                            >
                              <input
                                id={`${attribute.id}-${item.value}`}
                                type="radio"
                                value={item.value}
                                className="text-attribute-input"
                                name={attribute.id}
                                required
                              />
                              <label
                                className="text-attribute-label"
                                htmlFor={`${attribute.id}-${item.value}`}
                              >
                                {item.value}
                              </label>
                            </div>
                          );
                          // in case there is an additional type other than text and swatch
                          // } else if (attribute.type === "swatch") {
                        } else {
                          return (
                            <div
                              className="swatch-attribute-container"
                              key={item.displayValue}
                            >
                              <input
                                id={`${attribute.id}-${item.value}`}
                                type="radio"
                                value={item.value}
                                className="swatch-attribute-input"
                                name={attribute.id}
                                required
                              />
                              <label
                                className="swatch-attribute-label"
                                htmlFor={`${attribute.id}-${item.value}`}
                                style={{ backgroundColor: item.value }}
                              ></label>
                            </div>
                          );
                        }
                      })}
                    </div>
                  </div>
                ))}
                <div className="particular-product-price-container">
                  <h4 className="details-header">Price:</h4>
                  <CurrencyConsumer>
                    {(value) => {
                      const { currentCurrency } = value;
                      const selectedCurrency = Object.keys(currentCurrency)
                        .length
                        ? currentCurrency
                        : fetchCurrencyFromCache();
                      const price = findPrice(product, selectedCurrency);
                      return (
                        <p className="particular-product-price">
                          {price.currency.symbol}
                          {price.amount}
                        </p>
                      );
                    }}
                  </CurrencyConsumer>
                </div>
                {/* TODO: DISABLE BTN INITIALLY AND ENABLE ONLY WHEN ALL THE INPUTS ARE CHECKED */}
                <button type="submit" className="btn add-to-cart-btn">
                  Add to cart
                </button>
              </form>
            );
          }}
        </ItemsConsumer>
        <div dangerouslySetInnerHTML={createMarkup(product.description)}></div>
      </div>
    );
  }
}

export default ProductDetails;
