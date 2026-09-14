"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("cart");
      // localStorage doesn't exist during SSR, so this can only run after
      // mount; the initial [] keeps server/client markup matching on hydration.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (saved) setItems(JSON.parse(saved));
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addItem = (dish, quantity = 1) => {
    setItems((current) => {
      const existing = current.find((i) => i.id === dish.id);
      if (existing) {
        return current.map((i) =>
          i.id === dish.id ? { ...i, quantity: i.quantity + quantity } : i,
        );
      }
      return [...current, { ...dish, quantity }];
    });
  };

  const removeItem = (id) => {
    setItems((current) => current.filter((i) => i.id !== id));
  };
  const clearCart = () => setItems([]);

  const changeQuantity = (id, quantity) => {
    if (quantity < 1) return removeItem(id);
    setItems((current) =>
      current.map((i) => (i.id === id ? { ...i, quantity } : i)),
    );
  };
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        changeQuantity,
        count,
        total,
        isOpen,
        open,
        close,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
