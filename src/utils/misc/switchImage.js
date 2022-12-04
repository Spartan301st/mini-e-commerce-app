const switchImage = (selectedImgIndex, galleryLength, direction) => {
  const indexSwitchValue = direction === "right" ? 1 : -1;
  return (selectedImgIndex + indexSwitchValue + galleryLength) % galleryLength;
};

export default switchImage;
