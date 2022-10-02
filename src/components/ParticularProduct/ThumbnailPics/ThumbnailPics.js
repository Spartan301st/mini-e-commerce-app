import React from "react";
import "./ThumbnailPics.scss";

class ThumbnailPics extends React.Component {
  render() {
    const { imageURL, name, changeMainImage } = this.props;
    return (
      <div
        className="thumbnail-img-container"
        onClick={() => changeMainImage(imageURL)}
      >
        <img className="thumbnail-img" src={imageURL} alt={name} />
      </div>
    );
  }
}

export default ThumbnailPics;
