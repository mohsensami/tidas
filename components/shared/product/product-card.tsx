import Image from "next/image";
import Link from "next/link";

import { Card, CardContent, CardHeader } from "../../ui/card";
import ProductPrice from "./product-price";
import { Product } from "../../../types";
import Rating from "./rating";
import FavoriteButton from "./favorite-button";

const ProductCard = ({
  product,
  showFavoriteButton = false,
}: {
  product: Product;
  showFavoriteButton?: boolean;
}) => {
  return (
    <Card className="w-full max-w-sm relative ">
      {showFavoriteButton && (
        <div className="absolute top-2 right-2 z-10">
          <FavoriteButton productId={product.id} initialIsFavorite={true} />
        </div>
      )}
      <CardHeader className="p-0 items-center">
        <Link href={`/product/${product.slug}`}>
          <Image
            priority={true}
            src={product.images![0]}
            alt={product.name}
            className="aspect-square object-cover rounded mx-auto"
            height={300}
            width={300}
          />
        </Link>
      </CardHeader>
      <CardContent className="pb-4 grid gap-4">
        <Link href={`/product/${product.slug}`}>
          <h2 className="text-md font-medium">{product.name}</h2>
        </Link>
        {/* <div className="text-xs">{product.brand}</div> */}
        <div className="">
          {product.stock > 0 ? (
            <ProductPrice value={Number(product.price)} />
          ) : (
            <p className="text-destructive">موجود نیست</p>
          )}
        </div>
        <div>
          <Rating value={Number(product.rating)} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
