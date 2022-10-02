import React from "react";
import "./ParticularProduct.scss";
import { Query } from "@apollo/client/react/components";
import GET_SINGLE_PRODUCT from "../../queries/getSingleProduct";
import ThumbnailPics from "./ThumbnailPics/ThumbnailPics";
import ProductDetails from "./ProductDetails/ProductDetails";
import fetchCurrentPath from "../../utils/fetchCurrentPath";

class ParticularProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainImageURL: "",
    };
    this.changeMainImage = this.changeMainImage.bind(this);
  }

  changeMainImage(imgUrl) {
    return this.setState({ mainImageURL: imgUrl });
  }

  render() {
    const pathName = fetchCurrentPath(2);
    return (
      <div className="single-product-container">
        <Query query={GET_SINGLE_PRODUCT} variables={{ productID: pathName }}>
          {({ loading, data }) => {
            if (data) {
              const { product } = data;
              if (product) {
                return (
                  <>
                    <div className="product-thubnail-pictures">
                      {product.gallery.map((imageURL, i) => {
                        return (
                          <ThumbnailPics
                            key={`${product.id}-${i}`}
                            name={`${product.name} - ${i}`}
                            imageURL={imageURL}
                            changeMainImage={this.changeMainImage}
                          />
                        );
                      })}
                    </div>
                    <div className="product-main-picture">
                      <img
                        className="main-img"
                        src={this.state.mainImageURL || product.gallery[0]}
                        alt="main"
                      />
                    </div>
                    <ProductDetails product={product} />
                  </>
                );
              }
            }
          }}
        </Query>
      </div>
    );
  }
}

export default ParticularProduct;
