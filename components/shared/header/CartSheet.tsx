"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getMyCart } from "@/lib/actions/cart.actions";
import { Cart } from "@/types";
import { formatCurrency } from "@/lib/utils";

const CartSheet = () => {
  const [cart, setCart] = useState<Cart | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchCart();
    }
  }, [isOpen]);

  const fetchCart = async () => {
    setIsLoading(true);
    try {
      const cartData = await getMyCart();
      setCart(cartData);
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const items = cart?.items || [];
  const total = cart?.itemsPrice || "0";

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {items.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
              {items.length}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-[400px] sm:w-[480px] p-4 flex flex-col"
      >
        <SheetHeader>
          <SheetTitle className="text-lg font-bold text-right">
            سبد خرید
          </SheetTitle>
        </SheetHeader>

        {/* لیست محصولات */}
        <div className="flex-1 overflow-y-auto mt-4 space-y-4">
          {isLoading ? (
            <div className="flex items-center justify-center mt-10">
              <Loader className="w-6 h-6 animate-spin text-gray-500" />
            </div>
          ) : items.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">
              سبد خرید شما خالی است 🛒
            </p>
          ) : (
            items.map((item) => (
              <div
                key={item.productId}
                className="flex items-center justify-between border-b pb-3"
              >
                <div className="flex items-center gap-3">
                  <Link href={`/product/${item.slug}`}>
                    <div className="relative w-16 h-16 rounded-md overflow-hidden border">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </Link>
                  <div className="flex flex-col">
                    <Link href={`/product/${item.slug}`}>
                      <p className="text-sm font-medium text-right hover:text-primary">
                        {item.name}
                      </p>
                    </Link>
                    <p className="text-xs text-gray-500">
                      {item.qty} × {formatCurrency(item.price)} تومان
                    </p>
                  </div>
                </div>
                <p className="font-semibold text-sm">
                  {formatCurrency((Number(item.price) * item.qty).toFixed(2))}{" "}
                  تومان
                </p>
              </div>
            ))
          )}
        </div>

        {/* فوتر */}
        {!isLoading && items.length > 0 && (
          <SheetFooter className="flex flex-col gap-3 mt-6 border-t pt-3">
            <div className="flex items-center justify-between w-full">
              <span className="text-sm text-gray-600">جمع کل:</span>
              <span className="font-bold">{formatCurrency(total)} تومان</span>
            </div>

            <Link
              href="/cart"
              className="w-full"
              onClick={() => setIsOpen(false)}
            >
              <Button className="w-full">مشاهده سبد خرید</Button>
            </Link>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
