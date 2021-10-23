import { CartContextProvider } from "./CartContext";
import { CartItems } from "./CartItems";

export function Cart() {
  return (
    <>
      
      <CartContextProvider>
        <CartItems />
      </CartContextProvider>
    </>
  );
}
