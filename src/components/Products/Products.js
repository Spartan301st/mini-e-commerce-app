import React from "react";
import "./Products.scss";
import { Query } from "@apollo/client/react/components";
import GET_PRODUCTS from "../../queries/getProducts";
import Product from "./Product/Product";
import fetchPathname from "../../utils/fetchCurrentPath";

class Products extends React.Component {
  render() {
    const pathName = fetchPathname(1);
    return (
      <main className="products maxWidthLimiter">
        <h1 className="products__header">{pathName}</h1>

        <div className="products__categoryProducts">
          {/* fetch products for the given category */}
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
      </main>
    );
  }
}
export default Products;
