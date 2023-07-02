"use client";

import { useAuth } from "@clerk/nextjs";
import { createContext, useCallback, useContext, useState } from "react";
import getCartitem from "../action/getCartItem";

export const Context = createContext();

export const StateContext = ({ children }) => {
  const user = useAuth();
  const [qty, setQty] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [cartItem, setCartItem] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [guestCartItems, setGuestCartItems] = useState([]);

  const fetchCartItem = useCallback(() => {
    if (user.userId) {
      getCartitem(user.userId)
        .then((data) => setCartItems(data))
        .catch((err) => console.log(err));
    }
  }, [setCartItems, user.userId]);

  return (
    <Context.Provider
      value={{
        qty,
        setQty,
        cartOpen,
        setCartOpen,
        open,
        setOpen,
        cartItem,
        setCartItem,
        cartItems,
        setCartItems,
        fetchCartItem,
        guestCartItems,
        setGuestCartItems,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
