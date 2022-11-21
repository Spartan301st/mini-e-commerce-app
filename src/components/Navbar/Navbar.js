import React from "react";
import "./Navbar.scss";
import { RiShoppingBag2Fill } from "react-icons/ri";
import CartLinks from "./CartLinks/CartLinks";
import NavLinks from "./NavLinks/NavLinks";
import { Query } from "@apollo/client/react/components";
import GET_CURRENCIES from "../../queries/getCurrencies";

class Navbar extends React.Component {
  render() {
    return (
      <section className="navbar">
        <div className="maxWidthLimiter">
          <NavLinks />

          <RiShoppingBag2Fill className="navbar__bagIcon" />

          <Query query={GET_CURRENCIES}>
            {({ loading, data }) => {
              if (data) {
                const { currencies } = data;
                return <CartLinks currencies={currencies} />;
              }
            }}
          </Query>
        </div>
      </section>
    );
  }
}

export default Navbar;
