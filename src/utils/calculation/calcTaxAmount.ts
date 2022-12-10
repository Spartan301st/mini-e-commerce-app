const calcTaxAmount = (totalAmount: number) => {
  return Number((totalAmount * 0.21).toFixed(2));
};

export default calcTaxAmount;
