import React from "react";
import { NavLink } from "react-router-dom";

import "./NavLinks.scss";
class NavLinks extends React.Component {
  render() {
    const { categories } = this.props;
    return (
      <div className="navlinks-container">
        {categories.map((category, i) => (
          <NavLink
            key={i}
            className={({ isActive }) =>
              `navlink${isActive ? " active-link" : ""}`
            }
            to={category.name}
          >
            {category.name}
          </NavLink>
        ))}
      </div>
    );
  }
}
export default NavLinks;
