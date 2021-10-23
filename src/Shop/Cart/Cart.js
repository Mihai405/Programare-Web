import { useEffect, useState } from "react";
import { useAuthContext } from "../../Auth/AuthContext";
import { CartContextProvider } from "./CartContext";
import { CartList } from "./CartList";

export function Cart() {
  return (
    <>
      <CartContextProvider>
        <CartList />
      </CartContextProvider>
    </>
  );
}
