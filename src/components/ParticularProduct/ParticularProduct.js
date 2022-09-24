import React from "react";
import "./ParticularProduct.scss";
import { Query } from "@apollo/client/react/components";
import GET_SINGLE_PRODUCT from "../../queries/getSingleProduct";
import ThubnailPics from "./ThubnailPics/ThubnailPics";
import ProductDetails from "./ProductDetails/ProductDetails";

class ParticularProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainImageURL: "",
    };
    this.changeMainImage = this.changeMainImage.bind(this);
  }
  changeMainImage(imgUrl) {
    // this.setState((state, props) => {
    //   return (state.mainImageURL = imgUrl);
    // });
    return this.setState({ mainImageURL: imgUrl });
  }
  setInitialMainImage(imgUrl) {
    this.changeMainImage(imgUrl);
  }
  render() {
    // TODO: CHANGE MAIN IMAGE WHEN CLICKED ON ONE OF THE SELECTED IMAGES. PROBABLY NEEDS A STATE TO BE TRACKED
    const pathName = window.location.pathname.split("/")[2];
    return (
      <div className="single-product-container">
        <Query query={GET_SINGLE_PRODUCT} variables={{ productID: pathName }}>
          {({ loading, data }) => {
            if (data) {
              const { product } = data;
              if (product) {
                // this.setInitialMainImage(product.gallery[0]);

                return (
                  <>
                    <div className="product-thubnail-pictures">
                      {product.gallery.map((imageURL, i) => {
                        return (
                          <ThubnailPics
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

              // {
              /* 
                  <div className="product-details"></div> */
              // }
              // </>
              // );
            }
          }}
        </Query>
      </div>
    );
  }
}

export default ParticularProduct;
