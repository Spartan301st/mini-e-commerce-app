interface Price {
  currency: {
    symbol: string;
  };
  amount: number;
}

interface Attribute {
  displayValue: string;
  value: string;
}
interface AttributeSet {
  id: string;
  name: string;
  type: string; // text or swatch
  items: [Attribute];
}

interface SelectedItem {
  allAttributes: [AttributeSet];
  brand: string;
  gallery: [string];
  name: string;
  prices: [Price];
  quantity: number;
  selectedAttributes: {}; // can be further described
}

export default SelectedItem;
