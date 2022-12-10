import { gql } from "@apollo/client";

const GET_CURRENCIES = gql`
  {
    currencies {
      label
      symbol
    }
  }
`;

export default GET_CURRENCIES;
