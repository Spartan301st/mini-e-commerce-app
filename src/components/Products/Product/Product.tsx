import React from "react";
import "./Product.scss";
import { BsCart2 } from "react-icons/bs";
import { CurrencyConsumer } from "../../../context/currencyContext";
import { Link } from "react-router-dom";
import fetchItemsFromCache from "../../../utils/fetch/fetchItemsFromCache";
import setItemsToCache from "../../../utils/set/setItemsToCache";
import { ItemsConsumer } from "../../../context/itemsContext";
import fetchCurrencyFromCache from "../../../utils/fetch/fetchCurrencyFromCache";
import findPrice from "../../../utils/misc/findPrice";
import ProductInteface from "../../../interfaces/product";
import SelectedItem from "../../../interfaces/selectedItem";
import Currency from "../../../interfaces/currency";

type ProductType = {
  product: ProductInteface
}

class Product extends React.Component<ProductType> {
  product;
  productAvailable;
  lastSelectedCurrency;
  constructor(props: ProductType) {
    super(props);

    const { product } = this.props;
    this.product = product;
    this.productAvailable = product.inStock;

    this.lastSelectedCurrency = fetchCurrencyFromCache();

    // for saving def data
    this.saveProdWithDefAttrib = this.saveProdWithDefAttrib.bind(this);
  }

  saveProdWithDefAttrib(product: ProductInteface) {
    const allCartItems = fetchItemsFromCache();

    const cartProductData: SelectedItem = {
      brand: product.brand,
      name: product.name,
      prices: product.prices,
      gallery: product.gallery,
      allAttributes: [],
      selectedAttributes: {},
      quantity: 0,
    };
    

    // add selected attributes
    for (let [order, attribute] of product.attributes.entries()) {
      // for (let attribute of product.attributes) {
      // Note: there is an error while fetching products attributes (Nike's and Jacket's attributes are the same when fetched with GET_PRODUCTS when id is required. Probably cased by Attribute id match of both).
      cartProductData.allAttributes[order] = {
        // as name == id
        ...attribute,
        id: attribute.name,
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
      <div className="product">
        <Link className="product__productLink" to={this.product.id}>
          <div
            className={`product__imageContainer ${
              !this.productAvailable ? "out-of-stock" : ""
            }`}
          >
            {!this.productAvailable && (
              <h3 className="out-of-stock-txt">Out of stock</h3>
            )}

            <img
              className="product__image"
              src={this.product.gallery[0]}
              alt={this.product.name}
            />
          </div>
          <div className="product__titlePriceContainer">
            <h2 className="product__title">
              {this.product.brand} {this.product.name}
            </h2>
            <CurrencyConsumer>
              {(value) => {
                const { currentCurrency } = value;
                const price = findPrice(
                  this.product,
                  Object.keys(currentCurrency).length
                    ? currentCurrency as Currency
                    : this.lastSelectedCurrency
                );

                return (
                  <span className="product__price">
                    {price?.currency.symbol}
                    {price?.amount}
                  </span>
                );
              }}
            </CurrencyConsumer>
          </div>
        </Link>
        {this.productAvailable && (
          <ItemsConsumer>
            {(value) => {
              // to set items on the global context
              const { setItems } = value;
              return (
                <div
                  className="product__addDefaultIndicator"
                  onClick={() => {
                    this.saveProdWithDefAttrib(this.product);
                    setItems(fetchItemsFromCache());
                  }}
                >
                  <BsCart2 className="product__addDefaultIndicatorIcon" />
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
