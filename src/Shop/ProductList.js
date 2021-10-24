import { CartContextProvider } from "./Cart/CartContext.js";
import { ProductCard } from "./ProductCard";

export function ProductList({ products }) {
  return (
    <>
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </>
  );
}
