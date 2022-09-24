import React from "react";
import { BsCart2, BsCurrencyDollar } from "react-icons/bs";
import "./CardLinks.scss";

class CardLinks extends React.Component {
  render() {
    return (
      <div className="card-links-container">
        {/* <div> */}
        <BsCurrencyDollar />
        <select>
          <option value="usd"> USD</option>
        </select>
        {/* </div> */}
        <BsCart2 />
      </div>
    );
  }
}
export default CardLinks;
