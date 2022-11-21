import React from "react";
import "./Product.scss";
import { BsCart2 } from "react-icons/bs";
import { CurrencyConsumer } from "../../../context/currencyContext";

class Product extends React.Component {
  constructor(props) {
    super(props);

    const { product, productAvailable } = this.props;
    this.product = product;
    this.productAvailable = productAvailable;

    this.lastSelectedCurrency =
      JSON.parse(localStorage.getItem("currency")) || false;

    this.fetchPrice = this.fetchPrice.bind(this);
  }

  fetchPrice(lastSelectedCurrency, product) {
    return product.prices.find(
      (price) => price.currency.symbol === lastSelectedCurrency.symbol
    );
  }

  render() {
    return (
      <div className="product-container">
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
        {this.productAvailable && (
          <div className="to-product-page-cart-indicator">
            <BsCart2 />
          </div>
        )}
        <div className="product-title-price-container">
          <h2 className="product-title">{this.product.name}</h2>
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
      </div>
    );
  }
}

export default Product;
