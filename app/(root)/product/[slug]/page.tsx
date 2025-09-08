import { notFound } from "next/navigation";
import ProductPrice from "../../../../components/shared/product/product-price";
import { Card, CardContent } from "../../../../components/ui/card";
import { getProductBySlug } from "../../../../lib/actions/product.actions";
import { Button } from "../../../../components/ui/button";
import { Badge } from "../../../../components/ui/badge";
import ProductImages from "../../../../components/shared/product/product-images";

const ProductDetailsPage = async (props: {
  params: Promise<{ slug: string }>;
}) => {
  const params = await props.params;

  const { slug } = params;

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return (
    <>
      <section>
        <div className="grid grid-cols-1 md:grid-cols-5">
          {/* Images Column */}
          <div className="col-span-2">
            {/* Add Images */}
            <ProductImages images={product.images!} />
          </div>

          {/* Details Column */}
          <div className="col-span-2 p-5">
            <div className="flex flex-col gap-6">
              <p>
                {product.brand} {product.category}
              </p>
              <h1 className="h3-bold">{product.name}</h1>
              <p>
                {product.rating} of {product.numReviews} reviews
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <ProductPrice
                  value={Number(product.price)}
                  className="w-24 rounded-full bg-green-100 text-green-700 px-5 py-2"
                />
              </div>
            </div>
            <div className="mt-10">
              <p>Description:</p>
              <p>{product.description}</p>
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
                    <Button className="w-full">افزودن به سبد خرید</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetailsPage;
