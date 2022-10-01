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
                  return products.map((product) =>
                    product.inStock ? (
                      <Link key={product.id} to={product.id}>
                        <Product product={product} productAvailable={true} />
                      </Link>
                    ) : (
                      <Product
                        key={product.id}
                        product={product}
                        productAvailable={false}
                      />
                    )
                  );
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
