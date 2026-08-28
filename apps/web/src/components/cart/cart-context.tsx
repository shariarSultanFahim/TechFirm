"use client";

import React, { createContext, useContext, useState, useMemo } from "react";

export interface CartItem {
  id: string;
  title: string;
  category: string;
  price: number;
  period: "/mo" | "/yr" | "one-time";
  quantity: number;
  description?: string;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  setIsOpen: (open: boolean) => void;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  totalCount: number;
  subtotal: number;
}

const defaultInitialItems: CartItem[] = [
  {
    id: "smart-integration",
    title: "Smart Integration Tier",
    category: "Managed Cloud",
    price: 199,
    period: "/mo",
    quantity: 1,
    description: "Full-stack automated monitoring & edge caching."
  },
  {
    id: "dedicated-sla",
    title: "24/7 Dedicated SLA Support",
    category: "Security & Operations",
    price: 99,
    period: "/mo",
    quantity: 1,
    description: "15-minute response guarantee & priority escalation."
  }
];

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(defaultInitialItems);
  const [isOpen, setIsOpen] = useState(false);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const addItem = (newItem: Omit<CartItem, "quantity">) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === newItem.id);
      if (existing) {
        return prev.map((i) =>
          i.id === newItem.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...newItem, quantity: 1 }];
    });
    setIsOpen(true);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalCount = useMemo(
    () => items.reduce((acc, item) => acc + item.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [items]
  );

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        setIsOpen,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalCount,
        subtotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
