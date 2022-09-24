import React from "react";
import "./ThubnailPics.scss";

class ThubnailPics extends React.Component {
  render() {
    const { imageURL, name, changeMainImage } = this.props;
    return (
      <div
        className="thubnail-img-container"
        onClick={() => changeMainImage(imageURL)}
      >
        <img className="thubnail-img" src={imageURL} alt={name} />
      </div>
    );
  }
}

export default ThubnailPics;
