import React from "react";
import "./Products.scss";
import { Query } from "@apollo/client/react/components";
import GET_PRODUCTS from "../../queries/getProducts";
import Product from "./Product/Product";

class Products extends React.Component {
  // // TODO: check if state would be required when products would be fetched when navigating to a different category page
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const pathName = window.location.pathname.split("/")[1];
    return (
      <>
        <div className="category-products-container">
          <h1>{pathName}</h1>
          <div className="all-products-container">
            <Query query={GET_PRODUCTS} variables={{ category: pathName }}>
              {({ loading, data }) => {
                if (data) {
                  const {
                    category: { products },
                  } = data;
                  return products.map((product) => (
                    <Product key={product.id} product={product} />
                  ));
                }
              }}
            </Query>
          </div>
        </div>
      </>
    );
  }
}
export default Products;
