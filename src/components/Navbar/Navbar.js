import React from "react";
import "./Navbar.scss";
import CartLinks from "./CartLinks/CartLinks";
import NavLinks from "./NavLinks/NavLinks";
import { Query } from "@apollo/client/react/components";
import GET_CURRENCIES from "../../queries/getCurrencies";

class Navbar extends React.Component {
  render() {
    return (
      <header className="navbar">
        <div className="maxWidthLimiter">
          <NavLinks />

          <img src="/logo192.png" alt="logo" className="navbar__bagIcon" />

          <Query query={GET_CURRENCIES}>
            {({ loading, data }) => {
              if (data) {
                console.log("fetched data");
                const { currencies } = data;
                return <CartLinks currencies={currencies} />;
              }
            }}
          </Query>
        </div>
      </header>
    );
  }
}

export default Navbar;
