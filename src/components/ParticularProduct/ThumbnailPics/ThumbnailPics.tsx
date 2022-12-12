import React from "react";
import "./ThumbnailPics.scss";

type ThumbnailType = {
  name: string;
  imageURL: string;
  changeMainImage(imgUrl: string): void
}

class ThumbnailPics extends React.Component<ThumbnailType> {
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
