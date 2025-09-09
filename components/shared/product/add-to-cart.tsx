"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { addItemToCart } from "@/lib/actions/cart.actions";
import { CartItem } from "@/types";
import toast from "react-hot-toast";

const AddToCart = ({ item }: { item: CartItem }) => {
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

    router.push("/cart");

    // toast({
    //   description: `${item.name} added to the cart`,
    //   action: (
    //     <ToastAction
    //       className="bg-primary text-white hover:bg-gray-800"
    //       onClick={() => router.push("/cart")}
    //       altText="Go to cart"
    //     >
    //       Go to cart
    //     </ToastAction>
    //   ),
    // });
  };

  return (
    <Button className="w-full" type="button" onClick={handleAddToCart}>
      <Plus />
      اضافه به سبد خرید
    </Button>
  );
};

export default AddToCart;
