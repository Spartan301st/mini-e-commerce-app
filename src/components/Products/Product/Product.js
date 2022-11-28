import React from "react";
import "./Product.scss";
import { BsCart2 } from "react-icons/bs";
import { CurrencyConsumer } from "../../../context/currencyContext";
import { Link } from "react-router-dom";
import fetchItemsFromCache from "../../../utils/fetchItemsFromCache";
import setItemsToCache from "../../../utils/setItemsToCache";
import { ItemsConsumer } from "../../../context/itemsContext";

class Product extends React.Component {
  constructor(props) {
    super(props);

    const { product, productAvailable } = this.props;
    this.product = product;
    this.productAvailable = productAvailable;

    this.lastSelectedCurrency =
      JSON.parse(localStorage.getItem("currency")) || false;

    this.fetchPrice = this.fetchPrice.bind(this);

    // for saving def data
    this.saveProdWithDefAttrib = this.saveProdWithDefAttrib.bind(this);
  }

  fetchPrice(lastSelectedCurrency, product) {
    return product.prices.find(
      (price) => price.currency.symbol === lastSelectedCurrency.symbol
    );
  }

  saveProdWithDefAttrib(product) {
    const allCartItems = fetchItemsFromCache();

    const cartProductData = {
      brand: product.brand,
      name: product.name,
      prices: product.prices,
      gallery: product.gallery,
      // allAttributes: [...product.attributes],
      allAttributes: [],
      selectedAttributes: {},
      quantity: 0,
    };

    // add selected attributes
    for (let [order, attribute] of product.attributes.entries()) {
      // for (let attribute of product.attributes) {
      // Note: there is an error while fetching products attributes (Nike's and Jacket's attributes are the same when fetched with GET_PRODUCTS when id is required).
      cartProductData.allAttributes[order] = {
        // as name == id
        id: attribute.name,
        ...attribute,
      };
      cartProductData.selectedAttributes[attribute.name] =
        attribute.items[0].value;
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
      <div className="product-container">
        <Link to={this.product.id}>
          <div
            className={`product-image-container ${
              !this.productAvailable ? "out-of-stock" : ""
            }`}
          >
            {!this.productAvailable && <h3>Out of stock</h3>}

            <img
              className="product-image"
              src={this.product.gallery[0]}
              alt={this.product.name}
            />
          </div>
          <div className="product-title-price-container">
            <h2 className="product-title">
              {this.product.brand} {this.product.name}
            </h2>
            <CurrencyConsumer>
              {(value) => {
                const { currentCurrency } = value;
                const symbol = this.fetchPrice(
                  Object.keys(currentCurrency).length
                    ? currentCurrency
                    : this.lastSelectedCurrency,
                  this.product
                ).currency.symbol;

                const amount = this.fetchPrice(
                  Object.keys(currentCurrency).length
                    ? currentCurrency
                    : this.lastSelectedCurrency,
                  this.product
                ).amount;

                return (
                  <p className="product-price">
                    {symbol}
                    {amount}
                  </p>
                );
              }}
            </CurrencyConsumer>
          </div>
        </Link>
        {this.productAvailable && (
          // TODO: HERE
          <ItemsConsumer>
            {(value) => {
              // to set items on the global context
              const { setItems } = value;
              return (
                <div
                  className="to-product-page-cart-indicator"
                  onClick={() => {
                    this.saveProdWithDefAttrib(this.product);
                    setItems(fetchItemsFromCache());
                  }}
                >
                  <BsCart2 />
                </div>
              );
            }}
          </ItemsConsumer>
        )}
      </div>
    );
  }
}

export default Product;
