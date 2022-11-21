import { Query } from "@apollo/client/react/components";
import React from "react";
import { NavLink } from "react-router-dom";
import GET_CATEGORIES from "../../../queries/getCategories";

import "./NavLinks.scss";
class NavLinks extends React.Component {
  render() {
    return (
      <nav className="navbar__navlinksContainer">
        {/* fetched categories */}
        <Query query={GET_CATEGORIES}>
          {({ loading, data }) => {
            if (data) {
              const { categories } = data;
              // display categories as nav links
              return categories.map((category, i) => (
                <NavLink
                  key={i}
                  className={({ isActive }) =>
                    `navlink${isActive ? " active-link" : ""}`
                  }
                  to={category.name}
                >
                  {category.name}
                </NavLink>
              ));
            }
          }}
        </Query>
      </nav>
    );
  }
}
export default NavLinks;
