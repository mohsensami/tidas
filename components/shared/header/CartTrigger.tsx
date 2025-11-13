"use client";

import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCartSheet } from "./cart-sheet-context";
import { useState, useEffect, useCallback } from "react";
import { getMyCart } from "@/lib/actions/cart.actions";
import { Cart } from "@/types";

const CartTrigger = () => {
  const { openCartSheet } = useCartSheet();
  const [cart, setCart] = useState<Cart | undefined>(undefined);

  const fetchCart = useCallback(async () => {
    try {
      const cartData = await getMyCart();
      setCart(cartData);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const items = cart?.items || [];

  return (
    <Button variant="ghost" className="relative" onClick={openCartSheet}>
      <ShoppingCart className="h-5 w-5" />
      {items.length > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
          {items.length}
        </span>
      )}
    </Button>
  );
};

export default CartTrigger;
