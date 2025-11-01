import React from "react";
import { getMyFavorites } from "@/lib/actions/favorite.actions";
import ProductList from "@/components/shared/product/product-list";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const FavoritesPage = async () => {
  const session = await auth();

  // اگر کاربر لاگین نباشد، به صفحه لاگین هدایت شود
  if (!session) {
    redirect("/sign-in");
  }

  const favorites = await getMyFavorites();

  return (
    <div className="wrapper">
      <h1 className="h3-bold mb-6">علاقه‌مندی‌های من</h1>
      {favorites.length > 0 ? (
        <ProductList data={favorites} />
      ) : (
        <div className="text-center py-10">
          <p className="text-muted-foreground">
            شما هنوز محصولی به علاقه‌مندی‌های خود اضافه نکرده‌اید
          </p>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
