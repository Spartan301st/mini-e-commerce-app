import React from "react";
import findPrice from "../../utils/misc/findPrice";
import "./CartItem.scss";
import switchImage from "../../utils/misc/switchImage";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { BiMinus, BiPlus } from "react-icons/bi";
import incrementDecrementQuantity from "../../utils/set/incrementDecrementQuantity";
import CartItemAttribute from "./CartItemAttribute/CartItemAttribute";
import SelectedItem from "../../interfaces/selectedItem";
import Currency from "../../interfaces/currency";

type CartItemPropType = {
  cartItem: SelectedItem;
  cartItemID: string;
  setItems: (item: SelectedItem[]) => void;
  selectedItems: SelectedItem[];
  selectedCurrency: Currency;
  componentName: string
}

class CartItem extends React.Component<CartItemPropType> {
  cartItemID;
  setItems;
  componentName;
  state;
  constructor(props: CartItemPropType) {
    super(props);
    const { cartItemID, setItems, componentName } = this.props;
    this.cartItemID = cartItemID;
    this.setItems = setItems;
    this.componentName = componentName;

    this.state = {
      selectedImageIndex: 0,
    };
  }
  render() {
    const { cartItem, selectedItems, selectedCurrency } = this.props;
    const price = findPrice(cartItem, selectedCurrency);
    const { allAttributes, selectedAttributes } = cartItem;
    
    

    if (cartItem)
      return (
        <div className="cartItem">
          {/* left details */}
          <div className="cartItem__leftDetails">
            <div className="cartItem__brandNameContainer">
              <h2 className="cartItem__brand">{cartItem.brand}</h2>
              <h3 className="cartItem__name">{cartItem.name}</h3>
            </div>
            <span className="cartItem__price">
              {selectedCurrency.symbol}
              {price?.amount}
            </span>
            {/* rendering corresponding attribute names of the given cart item */}
            <div className="cartItem__attributesContainer">
              {allAttributes.map((attribute, i) => {
                const itemValue = selectedAttributes[attribute.id];
                return (
                  <CartItemAttribute
                    key={i}
                    componentName="cartItem"
                    parentComponentName={this.componentName}
                    attribute={attribute}
                    itemValue={itemValue}
                    cartItemID={this.cartItemID}
                  />
                );
              })}
            </div>
          </div>
          {/* right details */}
          <div className="cartItem__rightDetails">
            <div className="cartItem__amountAlterContainer">
              <button
                className="cartItem__addButton btn--outline"
                type="button"
                onClick={() =>
                  incrementDecrementQuantity(
                    "increment",
                    selectedItems,
                    cartItem,
                    this.setItems
                  )
                }
              >
                <BiPlus className="cartItem__addButtonTxt" />
              </button>
              <p className="cartItem__quantity">{cartItem.quantity}</p>
              <button
                className="cartItem__subtractButton btn--outline"
                type="button"
                onClick={() =>
                  incrementDecrementQuantity(
                    "decrement",
                    selectedItems,
                    cartItem,
                    this.setItems
                  )
                }
              >
                <BiMinus className="cartItem__subtractButtonTxt" />
              </button>
            </div>
            <div className="cartItem__imageContainer">
              <img
                className="cartItem__image"
                src={cartItem.gallery[this.state.selectedImageIndex]}
                alt={cartItem.name}
              />
              {cartItem.gallery.length > 1 && this.componentName === "cart" && (
                <div className="cartItem__ImgSwitchersContainer">
                  <button
                    className="cartItem__ImgSwitcherBtn"
                    onClick={() =>
                      this.setState({
                        selectedImageIndex: switchImage(
                          this.state.selectedImageIndex,
                          cartItem.gallery.length,
                          "left"
                        ),
                      })
                    }
                  >
                    <BsChevronLeft className="cartItem__ImgSwitcherIcon" />
                  </button>
                  <button
                    className="cartItem__ImgSwitcherBtn"
                    onClick={() =>
                      this.setState({
                        selectedImageIndex: switchImage(
                          this.state.selectedImageIndex,
                          cartItem.gallery.length,
                          "right"
                        ),
                      })
                    }
                  >
                    <BsChevronRight className="cartItem__ImgSwitcherIcon" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      );
  }
}

export default CartItem;
