import { useCartContext } from "./CartContext";
import { CartItemDetail } from "./CartItemDetail";

export function CartList() {
  const { cartItems } = useCartContext();
  return (
    <>
      {cartItems.map((cartItem, index) => (
        <CartItemDetail key={cartItem.id} index={index} {...cartItem} />
      ))}
    </>
  );
}
