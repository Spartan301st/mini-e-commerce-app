import React from "react";
import { AttributeSet } from "../../../interfaces/selectedItem";
import "./CartItemAttribute.scss";

type CartItemAttributePropType = {
  componentName: string;
  parentComponentName: string;
  attribute: AttributeSet;
  itemValue: string;
  cartItemID: string;
}
class CartItemAttribute extends React.Component<CartItemAttributePropType> {
  componentName;
  attribute;
  itemValue;
  cartItemID;
  parentComponentName;
  constructor(props: CartItemAttributePropType) {
    super(props);
    const {
      componentName,
      parentComponentName,
      attribute,
      itemValue,
      cartItemID,
    } = props;
    this.componentName = componentName;
    this.attribute = attribute;
    this.itemValue = itemValue;
    this.cartItemID = cartItemID;
    this.parentComponentName = parentComponentName;
  }

  render() {
    return (
      <div
        className={`${this.componentName}__attribute`}
        key={this.attribute.id}
      >
        <h4 className={`${this.componentName}__attributeName`}>
          {this.attribute.name}:
        </h4>
        <div className={`${this.componentName}__attributeValues`}>
          {this.attribute.items.map((item) => {
            return (
              <div
                className={`${this.componentName}__${this.attribute.type}AttributeContainer`}
                key={item.displayValue}
              >
                <input
                  id={`${this.parentComponentName}-${this.cartItemID}-${this.attribute.id}-${item.value}`}
                  type="radio"
                  value={item.value}
                  className={`${this.componentName}__${this.attribute.type}AttributeInput`}
                  defaultChecked={item.value === this.itemValue}
                  name={`${this.parentComponentName}-${this.cartItemID}-${this.attribute.id}-${item.value}`}
                  title={`${this.parentComponentName}-${this.cartItemID}-${this.attribute.id}-${item.value}`}
                  required
                  disabled
                />
                <label
                  className={`
                  ${this.componentName}__${this.attribute.type}AttributeLabel`}
                  htmlFor={`${this.parentComponentName}-${this.cartItemID}-${this.attribute.id}-${item.value}`}
                  style={
                    this.attribute.type === "swatch"
                      ? { backgroundColor: item.value }
                      : {}
                  }
                >
                  {this.attribute.type === "text" && item.value}
                </label>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
export default CartItemAttribute;
