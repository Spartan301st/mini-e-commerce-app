import Currency from "./currency";

interface Price {
  currency: Currency;
  amount: number;
}

interface Attribute {
  displayValue: string;
  value: string;
  id: string;
}

interface AttributeSet {
  id: string;
  name: string;
  type: string;
  items: Attribute[];
}

interface ProductInteface {
  id: string;
  name: string;
  inStock: boolean;
  gallery: [string];
  description: string;
  category: string;
  attributes: AttributeSet[];
  prices: [Price];
  brand: string;
}

export default ProductInteface;
export type { Price, Attribute, AttributeSet };
