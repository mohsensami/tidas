import { notFound } from "next/navigation";
import ProductPrice from "../../../../components/shared/product/product-price";
import { Card, CardContent } from "../../../../components/ui/card";
import { getProductBySlug } from "../../../../lib/actions/product.actions";
import { Button } from "../../../../components/ui/button";
import { Badge } from "../../../../components/ui/badge";
import ProductImages from "../../../../components/shared/product/product-images";
import AddToCart from "@/components/shared/product/add-to-cart";
import { getMyCart } from "@/lib/actions/cart.actions";
import { auth } from "@/auth";
import ReviewList from "./review-list";
import Rating from "@/components/shared/product/rating";
import FavoriteButton from "@/components/shared/product/favorite-button";
import { isProductFavorite } from "@/lib/actions/favorite.actions";

const ProductDetailsPage = async (props: {
  params: Promise<{ slug: string }>;
}) => {
  const params = await props.params;

  const { slug } = params;

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const cart = await getMyCart();

  const session = await auth();
  const userId = session?.user?.id;

  // بررسی وضعیت علاقه‌مندی محصول
  const favoriteStatus = await isProductFavorite(product.id);

  return (
    <>
      <section className="wrapper">
        <div className="grid grid-cols-1 md:grid-cols-5">
          {/* Images Column */}
          <div className="col-span-2">
            {/* Add Images */}
            <ProductImages images={product.images!} />
          </div>

          {/* Details Column */}
          <div className="col-span-2 p-5">
            <div className="flex flex-col gap-6">
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-6 flex-1">
                  <p>
                    {product.brand} {product.category}
                  </p>
                  <h1 className="h3-bold">{product.name}</h1>
                  <Rating value={Number(product.rating)} />
                  <p>{product.numReviews} دیدگاه</p>
                </div>
                <FavoriteButton
                  productId={product.id}
                  initialIsFavorite={favoriteStatus}
                />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <ProductPrice
                  value={Number(product.price)}
                  className="w-24 rounded-full bg-green-100 text-green-700 px-5 py-2"
                />
              </div>
            </div>
            <div className="mt-10">
              <p>توضیحات:</p>
              <p className="text-justify text-sm">{product.description}</p>
            </div>
          </div>
          {/* Action Column */}
          <div>
            <Card>
              <CardContent className="p-4">
                <div className="mb-2 flex justify-between">
                  <div>قیمت</div>
                  <div>
                    <ProductPrice value={Number(product.price)} />
                  </div>
                </div>
                <div className="mb-2 flex justify-between">
                  <div>ستاره</div>
                  {product.stock > 0 ? (
                    <Badge variant="outline">موجود</Badge>
                  ) : (
                    <Badge variant="destructive">موجود نیست</Badge>
                  )}
                </div>
                {product.stock > 0 && (
                  <div className=" flex-center">
                    <AddToCart
                      cart={cart}
                      item={{
                        productId: product.id,
                        name: product.name,
                        slug: product.slug,
                        price: product.price,
                        qty: 1,
                        image: product.images![0],
                      }}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <section className="mt-10 wrapper">
        <h2 className="h4-bold  mb-5">دیدگاه کاربران</h2>
        <ReviewList
          productId={product.id}
          productSlug={product.slug}
          userId={userId || ""}
        />
      </section>
    </>
  );
};

export default ProductDetailsPage;
