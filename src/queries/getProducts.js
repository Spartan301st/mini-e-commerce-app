import { gql } from "@apollo/client";

const GET_PRODUCTS = gql`
  query GetProducts($category: String!) {
    category(input: { title: $category }) {
      products {
        id
        name
        gallery
        prices {
          currency {
            symbol
          }
          amount
        }
        inStock
        brand
      }
    }
  }
`;

export default GET_PRODUCTS;
