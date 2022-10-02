import React from "react";
import "./ProductDetails.scss";

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

    // grab necessary data
    const allCartItems = JSON.parse(localStorage.getItem("items")) || false;
    const formData = new FormData(event.currentTarget);

    const cartProductData = {
      brand: product.brand,
      name: product.name,
      prices: product.prices,
      imageURL: product.gallery[0],
      allAttributes: [...product.attributes],
      selectedAttributes: {},
      quantity: 0,
    };

    for (let [key, value] of formData.entries()) {
      cartProductData.selectedAttributes[key] = value;
    }

    // if no cart items at all (no item was added to cart yet)
    if (!allCartItems) {
      cartProductData.quantity = 1;
      localStorage.setItem("items", JSON.stringify([cartProductData]));
    } else if (
      // if there is an item with the same selected attribute values
      allCartItems.some(
        (item) =>
          item.name === product.name &&
          JSON.stringify(item.selectedAttributes) ===
            JSON.stringify(cartProductData.selectedAttributes)
      )
    ) {
      const modifiedQuantity = allCartItems.map((item) => {
        if (item.name === product.name) {
          ++item.quantity;
        }
        return item;
      });
      localStorage.setItem("items", JSON.stringify(modifiedQuantity));
    } else {
      // if there was at least one item added to the cart and item with the new attribute values is added
      cartProductData.quantity = 1;
      localStorage.setItem(
        "items",
        JSON.stringify([...allCartItems, cartProductData])
      );
    }
    // reload page to reflect changes on other components
    window.location.reload(false);
  }

  render() {
    const { product } = this.props;
    const selectedCurrency =
      JSON.parse(localStorage.getItem("currency")) || false;
    const price = product.prices.find(
      (price) => price.currency.symbol === selectedCurrency.symbol
    );
    return (
      <div className="product-details-container">
        <div className="brand-naming-container">
          <h2>{product.brand}</h2>
          <h3>{product.name}</h3>
        </div>
        {/* form to be able to submit all the selections */}
        <form
          className="attributes-container"
          onSubmit={(e) => this.handleSubmit(e, product)}
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
            <p className="particular-product-price">
              {price.currency.symbol}
              {price.amount}
            </p>
          </div>
          <button type="submit" className="btn add-to-cart-btn">
            Add to cart
          </button>
        </form>
        <div dangerouslySetInnerHTML={createMarkup(product.description)}></div>
      </div>
    );
  }
}

export default ProductDetails;
