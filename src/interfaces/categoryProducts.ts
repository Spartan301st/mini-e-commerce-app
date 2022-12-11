// import Category from "./category";
import ProductInteface from "./product";

// interface CategoryInput {
//   title: string;
// }

// TODO: WRITE PROPER TYPE
interface CategoryProducts {
  // category(input: CategoryInput): () => Category;
  // category: { products: Category[] };
  category: {
    products: ProductInteface[];
    // products: [ProductInteface];
  };
}

export default CategoryProducts;
