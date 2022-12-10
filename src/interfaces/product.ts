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

interface Product {
  id: string;
  name: string;
  inStock: boolean;
  gallery: string[];
  description: string;
  category: string;
  attributes: AttributeSet[];
  prices: Price[];
  brand: String;
}

export default Product;
export type { Currency, Price, Attribute, AttributeSet };
