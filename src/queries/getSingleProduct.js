import { gql } from "@apollo/client";

const GET_SINGLE_PRODUCT = gql`
  query GetSingleProduct($productID: String!) {
    product(id: $productID) {
      id
      # name
      # inStock
      gallery
      description
      attributes {
        id
        name
        type
        items {
          displayValue
          value
        }
      }
      prices {
        amount
        currency {
          symbol
        }
      }
      # brand
    }
  }
`;

export default GET_SINGLE_PRODUCT;
