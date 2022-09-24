import { gql } from "@apollo/client";

const GET_PRODUCTS = gql`
  query GetProducts($category: String!) {
    category(input: { title: $category }) {
      products {
        id
        name
        gallery
        # TODO: FETCH PRICES BASED ON THE SELECTED CURRENCY
        prices {
          currency {
            symbol
          }
          amount
        }
        inStock
      }
    }
  }
`;

export default GET_PRODUCTS;
