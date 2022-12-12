import { Query } from "@apollo/client/react/components";
import React from "react";
import { NavLink } from "react-router-dom";
import Categories from "../../../interfaces/categories";
import GET_CATEGORIES from "../../../queries/getCategories";

import "./NavLinks.scss";
class NavLinks extends React.Component {
  render() {
    return (
      <nav className="navlinks">
        {/* fetched categories */}
        <Query<Categories> query={GET_CATEGORIES}>
          {({ data, loading }) => {
            if (data) {
              const { categories } = data;
              return <>
                {categories.map((category, i) => (                  
                  <NavLink
                    key={i}
                    className={({ isActive }) =>
                      `navlinks__navlink${isActive ? " active-link" : ""}`
                    }
                    to={category.name}
                  >
                    {category.name}
                  </NavLink>
                ))}
              </>
            }
            return <></>
          }}
        </Query>
      </nav>
    );
  }
}
export default NavLinks;
