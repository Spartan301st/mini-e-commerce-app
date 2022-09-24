import { gql } from "@apollo/client";

const CATEGORIES_QUERY = gql`
  {
    categories {
      name
    }
  }
`;

export default CATEGORIES_QUERY;
