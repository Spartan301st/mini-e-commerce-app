import React from "react";
import { AttributeSet } from "../../../../interfaces/product";
import "./ProductAttribute.scss";

type ProductAttributeType = {
  componentName: string;
  attribute: AttributeSet;
}

class ProductAttribute extends React.Component<ProductAttributeType> {
  componentName;
  attribute;
  constructor(props: ProductAttributeType) {
    super(props);
    const { componentName, attribute } = props;
    this.componentName = componentName;
    this.attribute = attribute;
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
                  id={`${this.attribute.id}-${item.value}`}
                  type="radio"
                  value={item.value}
                  className={`${this.componentName}__${this.attribute.type}AttributeInput`}
                  name={this.attribute.id}
                  required
                />
                <label
                  className={`${this.componentName}__${this.attribute.type}AttributeLabel`}
                  htmlFor={`${this.attribute.id}-${item.value}`}
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
export default ProductAttribute;
