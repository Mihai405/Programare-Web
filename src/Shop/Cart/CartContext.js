import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../Auth/AuthContext";

const CartContext = React.createContext();

export function CartContextProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const { token } = useAuthContext();
  const [itemsQuantity, setItemsQuantity] = useState(getItemsQuantity());

  useEffect(() => {
    async function getCartItems() {
      const res = await fetch("http://127.0.0.1:8000/api/shop/items/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setCartItems(data);
    }

    getCartItems();
  }, [itemsQuantity]);

  async function increaseItemQuantity(id, quantityValue) {
    const res = await fetch(`http://127.0.0.1:8000/api/shop/items/${id}/`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity: quantityValue }),
    });
    const data = await res.json();
    console.log(data);
    setItemsQuantity(itemsQuantity + 1);
  }

  async function decreaseItemQuantity(id, quantityValue) {
    const res = await fetch(`http://127.0.0.1:8000/api/shop/items/${id}/`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity: quantityValue }),
    });
    const data = await res.json();
    console.log(data);
    setItemsQuantity(itemsQuantity - 1);
  }

  async function addItemToOrder(id) {
    const res = await fetch(`http://127.0.0.1:8000/api/shop/items/${id}/`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ordered: 1 }),
    });
    const data = await res.json();
    console.log(data);
  }

  function getItemsQuantity() {
    if (cartItems) {
      const reducer = (previousValue, currentValue) =>
        previousValue + currentValue.quantity;
      return cartItems.reduce(reducer, 0);
    }
  }

  const value = {
    cartItems,
    setCartItems,
    increaseItemQuantity,
    decreaseItemQuantity,
    getItemsQuantity,
    addItemToOrder,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error(
      "Please use the Cart Context inside the CartContextProvider!"
    );
  }
  return context;
}
