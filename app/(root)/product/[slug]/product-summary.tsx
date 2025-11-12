"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ProductPrice from "@/components/shared/product/product-price";
import Rating from "@/components/shared/product/rating";
import FavoriteButton from "@/components/shared/product/favorite-button";
import AddToCart from "@/components/shared/product/add-to-cart";
import { Cart } from "@/types";
import { Package, CheckCircle2, XCircle, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface ProductSummaryProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: string | number;
    rating: string | number;
    numReviews: number;
    stock: number;
    brand: string;
    category: string;
    images: string[] | null;
  };
  cart?: Cart;
  isFavorite: boolean;
}

const ProductSummary = ({ product, cart, isFavorite }: ProductSummaryProps) => {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `محصول ${product.name}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // You can add a toast notification here
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{product.brand}</span>
              <span>•</span>
              <span>{product.category}</span>
            </div>
            <h1 className="text-3xl font-bold leading-tight">{product.name}</h1>
            <div className="flex items-center gap-4">
              <Rating value={Number(product.rating)} />
              <span className="text-sm text-muted-foreground">
                ({product.numReviews} دیدگاه)
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handleShare}
              className="shrink-0"
            >
              <Share2 className="w-4 h-4" />
            </Button>
            <FavoriteButton
              productId={product.id}
              initialIsFavorite={isFavorite}
            />
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center gap-3">
          <ProductPrice
            value={Number(product.price)}
            className="text-3xl font-bold text-primary"
          />
        </div>
      </div>

      <Separator />

      {/* Purchase Card */}
      <Card>
        <CardContent className="p-6 space-y-6">
          {/* Stock Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm font-medium">وضعیت موجودی:</span>
            </div>
            {product.stock > 0 ? (
              <Badge variant="outline" className="gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span>موجود در انبار ({product.stock} عدد)</span>
              </Badge>
            ) : (
              <Badge variant="destructive" className="gap-2">
                <XCircle className="w-4 h-4" />
                <span>موجود نیست</span>
              </Badge>
            )}
          </div>

          <Separator />

          {/* Add to Cart */}
          {product.stock > 0 ? (
            <div className="space-y-4">
              <AddToCart
                cart={cart}
                item={{
                  productId: product.id,
                  name: product.name,
                  slug: product.slug,
                  price: String(product.price),
                  qty: 1,
                  image: product.images?.[0] || "",
                }}
              />
            </div>
          ) : (
            <Button disabled className="w-full" size="lg">
              محصول موجود نیست
            </Button>
          )}

          {/* Product Info */}
          <div className="space-y-3 pt-4 border-t">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">برند:</span>
              <span className="font-medium">{product.brand}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">دسته‌بندی:</span>
              <span className="font-medium">{product.category}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">امتیاز:</span>
              <div className="flex items-center gap-2">
                <Rating value={Number(product.rating)} />
                <span className="font-medium">
                  {Number(product.rating).toFixed(1)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductSummary;
