"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Minus, Plus } from "lucide-react";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";
import { Cart, CartItem } from "@/types";
import toast from "react-hot-toast";

const AddToCart = ({
  cart,
  item,
}: {
  cart?: Cart;
  item: Omit<CartItem, "cartId">;
}) => {
  const router = useRouter();

  const handleAddToCart = async () => {
    // Execute the addItemToCart action
    const res = await addItemToCart(item);

    // Display appropriate toast message based on the result
    if (!res.success) {
      toast.error(res.message);
      return;
    }

    // toast.success(`${item.name} added to the cart`);

    toast.success((t) => (
      <div>
        <span>{`${item.name} added to the cart`}</span>
        <div className="text-center">
          <Button size="sm" onClick={() => toast.dismiss(t.id)}>
            سبد خرید
          </Button>
        </div>
      </div>
    ));

    // router.push("/cart");
  };

  // Remove item from cart
  const handleRemoveFromCart = async () => {
    const res = await removeItemFromCart(item.productId);

    // toast({
    //   variant: res.success ? "default" : "destructive",
    //   description: res.message,
    // });
    toast.success(res.message);

    return;
  };

  const existItem =
    cart && cart.items.find((x) => x.productId === item.productId);

  return existItem ? (
    <div>
      <Button type="button" variant="outline" onClick={handleRemoveFromCart}>
        <Minus className="w-4 h-4" />
      </Button>
      <span className="px-2">{existItem.qty}</span>
      <Button type="button" variant="outline" onClick={handleAddToCart}>
        <Plus className="w-4 h-4" />
      </Button>
    </div>
  ) : (
    <Button className="w-full" type="button" onClick={handleAddToCart}>
      <Plus className="w-4 h-4" />
      Add to cart
    </Button>
  );
};

export default AddToCart;
