"use client";

import { Button } from "@/components/ui/button";
import { Heart, Loader } from "lucide-react";
import { toggleFavorite } from "@/lib/actions/favorite.actions";
import toast from "react-hot-toast";
import { useTransition } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const FavoriteButton = ({
  productId,
  initialIsFavorite = false,
}: {
  productId: string;
  initialIsFavorite?: boolean;
}) => {
  const [isPending, startTransition] = useTransition();
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const router = useRouter();

  // تابع toggle برای افزودن یا حذف از علاقه‌مندی‌ها
  const handleToggleFavorite = async () => {
    startTransition(async () => {
      const res = await toggleFavorite(productId);

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      // بروزرسانی وضعیت محلی
      setIsFavorite(res.isFavorite || false);

      // نمایش پیام موفقیت
      toast.success(res.message);

      // رفرش صفحه برای به‌روزرسانی لیست علاقه‌مندی‌ها
      router.refresh();
    });
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      disabled={isPending}
      onClick={handleToggleFavorite}
      className={`h-10 w-10 ${
        isFavorite ? "text-red-500 hover:text-red-600" : ""
      }`}
      aria-label={
        isFavorite ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"
      }
    >
      {isPending ? (
        <Loader className="w-4 h-4 animate-spin" />
      ) : (
        <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
      )}
    </Button>
  );
};

export default FavoriteButton;
