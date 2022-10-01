import React from "react";
import "./Product.scss";
import { BsCart2 } from "react-icons/bs";

class Product extends React.Component {
  render() {
    const { product, productAvailable } = this.props;
    const selectedCurrency =
      JSON.parse(localStorage.getItem("currency")) || false;
    const price = product.prices.find(
      (price) => price.currency.symbol === selectedCurrency.symbol
    );
    return (
      <div className="product-container">
        <div
          className={`product-image-container ${
            !productAvailable ? "out-of-stock" : ""
          }`}
        >
          {!productAvailable && <h3>Out of stock</h3>}

          <img
            className="product-image"
            src={product.gallery[0]}
            alt={product.name}
          />
        </div>
        {productAvailable && (
          <div className="to-product-page-cart-indicator">
            <BsCart2 />
          </div>
        )}
        <div className="product-title-price-container">
          <h2 className="product-title">{product.name}</h2>
          <p className="product-price">
            {price.currency.symbol}
            {price.amount}
          </p>
        </div>
      </div>
    );
  }
}

export default Product;
