"use client";

import { createContext, useContext, useState } from "react";

export const Context = createContext();

export const StateContext = ({ children }) => {
  const [qty, setQty] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <Context.Provider value={{ qty, setQty, cartOpen, setCartOpen }}>
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
