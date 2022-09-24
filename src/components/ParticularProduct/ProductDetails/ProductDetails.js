import React from "react";
import "./ProductDetails.scss";

function createMarkup(markup) {
  return { __html: markup };
}

class ProductDetails extends React.Component {
  render() {
    // console.log(this.props);
    const { product } = this.props;
    // document
    //   .getElementsByClassName("product-details-container")
    //   .appendChild(product.description);

    console.log(product);

    return (
      <div className="product-details-container">
        <h2>{product.brand}</h2>
        <h3>{product.name}</h3>
        <div>
          {product.attributes.map((attribute) => (
            <div className="attribute-container" key={attribute.id}>
              <h4 className="details-header">{attribute.name}:</h4>
              <div className="attribute-values">
                {attribute.items.map((item) => {
                  if (attribute.type === "text") {
                    return (
                      <div key={item.displayValue} className="text-attribute">
                        {item.displayValue}
                      </div>
                    );
                  } else if (attribute.type === "swatch") {
                    return (
                      <div
                        key={item.displayValue}
                        className="swatch-attribute"
                        style={{ backgroundColor: item.value }}
                      ></div>
                    );
                  }
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="particular-product-price-container">
          <h4 className="details-header">Price:</h4>
          <p className="particular-product-price">
            {product.prices[0].currency.symbol}
            {product.prices[0].amount}
          </p>
        </div>
        <button className="btn add-to-cart-btn">Add to cart</button>
        <div dangerouslySetInnerHTML={createMarkup(product.description)}></div>
      </div>
    );
    // return <div>hello</div>;
  }
}

export default ProductDetails;
