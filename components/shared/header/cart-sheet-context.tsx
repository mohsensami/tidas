"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface CartSheetContextType {
  openCartSheet: () => void;
  closeCartSheet: () => void;
  isOpen: boolean;
}

const CartSheetContext = createContext<CartSheetContextType | undefined>(
  undefined
);

export const CartSheetProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openCartSheet = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeCartSheet = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <CartSheetContext.Provider value={{ openCartSheet, closeCartSheet, isOpen }}>
      {children}
    </CartSheetContext.Provider>
  );
};

export const useCartSheet = () => {
  const context = useContext(CartSheetContext);
  if (!context) {
    throw new Error("useCartSheet must be used within CartSheetProvider");
  }
  return context;
};

