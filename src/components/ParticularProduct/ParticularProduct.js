import React from "react";
import "./ParticularProduct.scss";
import { Query } from "@apollo/client/react/components";
import GET_SINGLE_PRODUCT from "../../queries/getSingleProduct";
import ThumbnailPics from "./ThumbnailPics/ThumbnailPics";
import ProductDetails from "./ProductDetails/ProductDetails";
import fetchCurrentPath from "../../utils/fetch/fetchCurrentPath";

class ParticularProduct extends React.Component {
  constructor(props) {
    super(props);

    this.pathName = fetchCurrentPath(2);
    this.state = {
      mainImageURL: "",
    };
    this.changeMainImage = this.changeMainImage.bind(this);
  }

  changeMainImage(imgUrl) {
    return this.setState({ mainImageURL: imgUrl });
  }

  render() {
    return (
      <main className="singleProduct maxWidthLimiter">
        <Query
          query={GET_SINGLE_PRODUCT}
          variables={{ productID: this.pathName }}
        >
          {({ loading, data }) => {
            if (data) {
              const { product } = data;
              if (product) {
                return (
                  <>
                    <div className="singleProduct__thumbnails">
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

                    <div className="singleProduct__mainImgContainer">
                      <img
                        className="singleProduct__mainImg"
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
      </main>
    );
  }
}

export default ParticularProduct;
