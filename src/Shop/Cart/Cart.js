import { useEffect, useState } from "react";
import { useAuthContext } from "../../Auth/AuthContext";
import { CartList } from "./CartList";

export function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const { token }=useAuthContext();

  useEffect(() => {
    async function getCartItems() {
      const res = await fetch(
        "http://127.0.0.1:8000/api/marketplace/items/",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      setCartItems(data);
    }

    getCartItems();
  }, []);

  return (
    <>
      <CartList cartItems={cartItems} />
    </>
  );
}
