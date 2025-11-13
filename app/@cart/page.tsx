"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Loader, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useTransition, useCallback } from "react";
import { getMyCart, deleteItemFromCart } from "@/lib/actions/cart.actions";
import { Cart } from "@/types";
import { formatCurrency } from "@/lib/utils";
import toast from "react-hot-toast";
import { useCartSheet } from "@/components/shared/header/cart-sheet-context";

const CartSheet = () => {
  const { isOpen, closeCartSheet } = useCartSheet();
  const [cart, setCart] = useState<Cart | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [deletingItemId, setDeletingItemId] = useState<string | null>(null);

  const fetchCart = useCallback(async () => {
    setIsLoading(true);
    try {
      const cartData = await getMyCart();
      setCart(cartData);
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // دریافت سبد خرید هنگام باز شدن Sheet
  useEffect(() => {
    if (isOpen) {
      fetchCart();
    }
  }, [isOpen, fetchCart]);

  // دریافت سبد خرید در mount برای نمایش badge صحیح
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleDeleteItem = (productId: string) => {
    setDeletingItemId(productId);
    startTransition(async () => {
      const res = await deleteItemFromCart(productId);
      if (res.success) {
        toast.success(res.message);
        // بروزرسانی سبد خرید
        await fetchCart();
      } else {
        toast.error(res.message);
      }
      setDeletingItemId(null);
    });
  };

  const items = cart?.items || [];
  const total = cart?.itemsPrice || "0";

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCartSheet()}>
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
                className="flex items-center justify-between border-b pb-3 gap-2"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <Link href={`/product/${item.slug}`}>
                    <div className="relative w-16 h-16 rounded-md overflow-hidden border flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </Link>
                  <div className="flex flex-col min-w-0 flex-1">
                    <Link href={`/product/${item.slug}`}>
                      <p className="text-sm font-medium text-right hover:text-primary truncate">
                        {item.name}
                      </p>
                    </Link>
                    <p className="text-xs text-gray-500 text-right">
                      {item.qty} × {formatCurrency(item.price)} تومان
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <p className="font-semibold text-sm whitespace-nowrap">
                    {formatCurrency((Number(item.price) * item.qty).toFixed(2))}{" "}
                    تومان
                  </p>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => handleDeleteItem(item.productId)}
                    disabled={isPending || deletingItemId === item.productId}
                    title="حذف از سبد خرید"
                  >
                    {deletingItemId === item.productId ? (
                      <Loader className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </Button>
                </div>
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
              onClick={() => closeCartSheet()}
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
