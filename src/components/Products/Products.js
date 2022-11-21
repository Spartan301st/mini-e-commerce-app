import React from "react";
import "./Products.scss";
import { Query } from "@apollo/client/react/components";
import GET_PRODUCTS from "../../queries/getProducts";
import Product from "./Product/Product";
import fetchPathname from "../../utils/fetchCurrentPath";
import { Link } from "react-router-dom";

class Products extends React.Component {
  render() {
    const pathName = fetchPathname(1);
    return (
      <section className="products">
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
                  <Link key={product.id} to={product.id}>
                    <Product
                      product={product}
                      productAvailable={product.inStock}
                    />
                  </Link>
                ));
              }
            }}
          </Query>
        </div>
      </section>
    );
  }
}
export default Products;
