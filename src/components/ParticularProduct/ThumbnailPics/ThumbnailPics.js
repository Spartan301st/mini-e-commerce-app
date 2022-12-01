import React from "react";
import "./ThumbnailPics.scss";

class ThumbnailPics extends React.Component {
  render() {
    const { imageURL, name, changeMainImage } = this.props;
    return (
      <div
        className="thumbnail"
        onClick={() => changeMainImage(imageURL)}
      >
        <img className="thumbnail__img" src={imageURL} alt={name} />
      </div>
    );
  }
}

export default ThumbnailPics;
