import React from "react";
import { Link } from "react-router-dom";
import "./Product.scss";

class Product extends React.Component {
  render() {
    const { product } = this.props;
    const productAvailable = product.inStock;
    if (productAvailable) {
      return (
        <Link to={product.id}>
          <div className="product-container">
            <div
              className={`product-image-container ${
                !productAvailable ? "out-of-stock" : ""
              }`}
            >
              {!productAvailable && <h3>Out of stock</h3>}
              <img
                // style={{ width: "50px" }}
                className="product-image"
                src={product.gallery[0]}
                alt={product.name}
              />
            </div>
            <h2 className="product-title">{product.name}</h2>
            <p className="product-price">
              {product.prices[0].currency.symbol}
              {product.prices[0].amount}
            </p>
          </div>
        </Link>
      );
    } else {
      return (
        // TODO: SHORTEN THIS
        <div className="product-container">
          <div
            className={`product-image-container ${
              !productAvailable ? "out-of-stock" : ""
            }`}
          >
            {!productAvailable && <h3>Out of stock</h3>}
            <img
              // style={{ width: "50px" }}
              className="product-image"
              src={product.gallery[0]}
              alt={product.name}
            />
          </div>
          <h2 className="product-title">{product.name}</h2>
          <p className="product-price">
            {product.prices[0].currency.symbol}
            {product.prices[0].amount}
          </p>
        </div>
      );
    }
  }
}

export default Product;
