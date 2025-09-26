"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Loader, Minus, Plus } from "lucide-react";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";
import { Cart, CartItem } from "@/types";
import toast from "react-hot-toast";
import { useTransition } from "react";

const AddToCart = ({
  cart,
  item,
}: {
  cart?: Cart;
  item: Omit<CartItem, "cartId">;
}) => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  // Add item to cart
  const handleAddToCart = async () => {
    startTransition(async () => {
      // Execute the addItemToCart action
      const res = await addItemToCart(item);

      // Display appropriate toast message based on the result
      if (!res.success) {
        toast.error(res.message);
        return;
      }

      toast.success((t) => (
        <div>
          <span>{`${item.name} به سبد خرید اضافه شد`}</span>
          <div className="text-center">
            {/* <Button size="sm" onClick={() => toast.dismiss(t.id)}> */}
            <Button size="sm" onClick={() => router.push("/cart")}>
              سبد خرید
            </Button>
          </div>
        </div>
      ));
      // router.push("/cart");
    });
  };

  // Remove item from cart
  const handleRemoveFromCart = async () => {
    startTransition(async () => {
      const res = await removeItemFromCart(item.productId);

      // toast({
      //   variant: res.success ? "default" : "destructive",
      //   description: res.message,
      // });
      toast.success(res.message);

      return;
    });
  };

  const existItem =
    cart && cart.items.find((x) => x.productId === item.productId);

  return existItem ? (
    <div>
      <Button
        type="button"
        variant="outline"
        disabled={isPending}
        onClick={handleRemoveFromCart}
      >
        {isPending ? (
          <Loader className="w-4 h-4  animate-spin" />
        ) : (
          <Minus className="w-4 h-4" />
        )}
      </Button>
      <span className="px-2">{existItem.qty}</span>
      <Button
        type="button"
        variant="outline"
        disabled={isPending}
        onClick={handleAddToCart}
      >
        {isPending ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          <Plus className="w-4 h-4" />
        )}
      </Button>
    </div>
  ) : (
    <Button
      className="w-full"
      type="button"
      disabled={isPending}
      onClick={handleAddToCart}
    >
      {isPending ? (
        <Loader className="w-4 h-4 animate-spin" />
      ) : (
        <Plus className="w-4 h-4" />
      )}
      افزودن به سبد خرید
    </Button>
  );
};

export default AddToCart;
