"use client";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { Cart, CartItem } from "@/types";

const AddToCart = ({
  cart,
  item,
}: {
  cart?: Cart;
  item: Omit<CartItem, "cartId">;
}) => {
  return (
    <div className="space-y-3 text-center">
      <p className="text-sm text-muted-foreground">
        لطفا برای استعلام قیمت با ما تماس بگیرید
      </p>
      <Button className="w-full" type="button" variant="outline" asChild>
        <a
          href="tel:0912-----"
          className="flex items-center justify-center gap-2"
        >
          <Phone className="w-4 h-4" />
          0912-----
        </a>
      </Button>
    </div>
  );
};

export default AddToCart;
