import { gql } from "@apollo/client";

const GET_PRODUCTS = gql`
  query GetProducts($category: String!) {
    category(input: { title: $category }) {
      products {
        id
        name
        gallery
        attributes {
          # id # COMMENT OUT LATER
          name
          type
          items {
            displayValue
            value
          }
        }
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
