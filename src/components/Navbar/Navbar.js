import React from "react";
import GET_CATEGORIES from "../../queries/getCategories";
import "./Navbar.scss";
import { RiShoppingBag2Fill } from "react-icons/ri";
import CartLinks from "./CartLinks/CartLinks";
import NavLinks from "./NavLinks/NavLinks";
import { Query } from "@apollo/client/react/components";
import GET_CURRENCIES from "../../queries/getCurrencies";

class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar">
        <Query query={GET_CATEGORIES}>
          {({ loading, data }) => {
            if (data) {
              const { categories } = data;
              return <NavLinks categories={categories} />;
            }
          }}
        </Query>

        <RiShoppingBag2Fill className="bag-icon" />

        <Query query={GET_CURRENCIES}>
          {({ loading, data }) => {
            if (data) {
              const { currencies } = data;
              return <CartLinks currencies={currencies} />;
            }
          }}
        </Query>
      </nav>
    );
  }
}

export default Navbar;
