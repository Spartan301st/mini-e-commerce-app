const switchImage = (
  selectedImgIndex: number,
  galleryLength: number,
  direction: string
) => {
  const indexSwitchValue = direction === "right" ? 1 : -1;
  return (selectedImgIndex + indexSwitchValue + galleryLength) % galleryLength;
};

export default switchImage;
