import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../Auth/AuthContext";

const CartContext = React.createContext();

export function CartContextProvider({ children }) {
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
  const value={cartItems,setCartItems};
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCartContext() {
    const context = useContext(CartContext);
    if (context === undefined) {
      throw new Error(
        'Please use the Cart Context inside the CartContextProvider!'
      );
    }
    return context;
  }
