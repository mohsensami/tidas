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
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// نمونه داده – در پروژه واقعی از context یا state global بگیرش
const sampleCartItems = [
  {
    id: 1,
    title: "کفش ورزشی نایک مدل Air Zoom",
    price: 3200000,
    image: "/images/shoes1.jpg",
    qty: 1,
  },
  {
    id: 2,
    title: "هدفون بلوتوث سونی WH-1000XM5",
    price: 8900000,
    image: "/images/headphone.jpg",
    qty: 2,
  },
];

const CartSheet = () => {
  const [items, setItems] = useState(sampleCartItems);

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <Sheet>
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
          {items.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">
              سبد خرید شما خالی است 🛒
            </p>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b pb-3"
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-16 h-16 rounded-md overflow-hidden border">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-sm font-medium text-right">
                      {item.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {item.qty} × {item.price.toLocaleString("fa-IR")} تومان
                    </p>
                  </div>
                </div>
                <p className="font-semibold text-sm">
                  {(item.price * item.qty).toLocaleString("fa-IR")} تومان
                </p>
              </div>
            ))
          )}
        </div>

        {/* فوتر */}
        <SheetFooter className="flex flex-col gap-3 mt-6 border-t pt-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">جمع کل:</span>
            <span className="font-bold">
              {total.toLocaleString("fa-IR")} تومان
            </span>
          </div>

          <Link href="/cart" className="w-full">
            <Button className="w-full">مشاهده سبد خرید</Button>
          </Link>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
