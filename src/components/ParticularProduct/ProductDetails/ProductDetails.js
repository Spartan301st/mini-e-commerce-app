import React from "react";
import "./ProductDetails.scss";
import fetchItemsFromCache from "../../../utils/fetch/fetchItemsFromCache";
import { ItemsConsumer } from "../../../context/itemsContext";
import { CurrencyConsumer } from "../../../context/currencyContext";
import fetchCurrencyFromCache from "../../../utils/fetch/fetchCurrencyFromCache";
import findPrice from "../../../utils/misc/findPrice";
import ProductAttribute from "./ProductAttribute/ProductAttribute";

import { Markup } from "interweave";
import setItemsToCache from "../../../utils/set/setItemsToCache";

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    const { product } = this.props;
    this.product = product;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event, product) {
    event.preventDefault();
    if (!product.inStock) return;

    // all saved items from cache
    const allCartItems = fetchItemsFromCache();
    // submitted form data
    const formData = new FormData(event.currentTarget);

    // new data to be saved
    const cartProductData = {
      brand: product.brand,
      name: product.name,
      prices: product.prices,
      gallery: product.gallery,
      allAttributes: [...product.attributes],
      selectedAttributes: {},
      quantity: 0,
    };

    // add newly selected attributes to the final data to be saved
    for (let [key, value] of formData.entries()) {
      cartProductData.selectedAttributes[key] = value;
    }

    // if no cart items at all (no item was added to cart yet)
    if (!allCartItems.length) {
      cartProductData.quantity = 1;
      setItemsToCache([cartProductData]);
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
      setItemsToCache(modifiedQuantityItem);
    }
    // if there was at least one item added to the cart and item with the new attribute values is added
    else {
      cartProductData.quantity = 1;
      setItemsToCache([...allCartItems, cartProductData]);
    }
  }

  render() {
    return (
      <div className="productDetails">
        <div className="productDetails__brandNameContainer">
          <h2 className="productDetails__brandName">{this.product.brand}</h2>
          <h3 className="productDetails__productName">{this.product.name}</h3>
        </div>
        <ItemsConsumer>
          {(value) => {
            // to set items on the global context
            const { setItems } = value;
            // form to be able to submit all the selections
            return (
              <form
                className="productDetails__attributesForm"
                onSubmit={(e) => {
                  this.handleSubmit(e, this.product);
                  // Note: we are refetching the entire cache to save it in the global context for selected items
                  setItems(fetchItemsFromCache());
                }}
              >
                {this.product.attributes.map((attribute, i) => (
                  <ProductAttribute
                    key={i}
                    componentName="productDetails"
                    attribute={attribute}
                  />
                ))}
                <div className="productDetails__priceContainer">
                  <h4 className="productDetails__priceHeader">Price:</h4>
                  <CurrencyConsumer>
                    {(value) => {
                      const { currentCurrency } = value;
                      const selectedCurrency = Object.keys(currentCurrency)
                        .length
                        ? currentCurrency
                        : fetchCurrencyFromCache();
                      const price = findPrice(this.product, selectedCurrency);
                      return (
                        <span className="productDetails__price">
                          {price.currency.symbol}
                          {price.amount}
                        </span>
                      );
                    }}
                  </CurrencyConsumer>
                </div>
                <button
                  type="submit"
                  className="btn--green productDetails__submitBtn"
                  disabled={!this.product.inStock}
                >
                  Add to cart
                </button>
              </form>
            );
          }}
        </ItemsConsumer>
        <Markup
          className="productDetails__descriptions"
          content={this.product.description}
        />
      </div>
    );
  }
}

export default ProductDetails;
