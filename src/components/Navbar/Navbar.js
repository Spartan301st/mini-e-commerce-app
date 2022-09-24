import React from "react";
import GET_CATEGORIES from "../../queries/getCategories";
import "./Navbar.scss";
import { RiShoppingBag2Fill } from "react-icons/ri";
import CardLinks from "./CardLinks/CardLinks";
import NavLinks from "./NavLinks/NavLinks";
import { Query } from "@apollo/client/react/components";

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
        <CardLinks />
      </nav>
    );
  }
}

export default Navbar;
