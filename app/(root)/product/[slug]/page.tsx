import { notFound } from "next/navigation";
import { getProductBySlug } from "../../../../lib/actions/product.actions";
import { getMyCart } from "@/lib/actions/cart.actions";
import { auth } from "@/auth";
import { isProductFavorite } from "@/lib/actions/favorite.actions";
import ProductHeader from "./product-header";
import ProductGallery from "./product-gallery";
import ProductSummary from "./product-summary";
import ProductTabs from "./product-tabs";
import RelatedProducts from "./related-products";

const ProductDetailsPage = async (props: {
  params: Promise<{ slug: string }>;
}) => {
  const params = await props.params;

  const { slug } = params;

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const cart = await getMyCart();

  const session = await auth();
  const userId = session?.user?.id || "";

  // بررسی وضعیت علاقه‌مندی محصول
  const favoriteStatus = await isProductFavorite(product.id);

  return (
    <>
      {/* Breadcrumb Header */}
      <ProductHeader name={product.name} category={product.category} />

      {/* Main Product Section */}
      <section className="wrapper py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Gallery */}
          <div>
            <ProductGallery images={product.images || []} name={product.name} />
          </div>

          {/* Product Summary */}
          <div>
            <ProductSummary
              product={{
                id: product.id,
                name: product.name,
                slug: product.slug,
                price: product.price,
                rating: product.rating,
                numReviews: product.numReviews,
                stock: product.stock,
                brand: product.brand,
                category: product.category,
                images: product.images,
              }}
              cart={cart}
              isFavorite={favoriteStatus}
            />
          </div>
        </div>
      </section>

      {/* Product Tabs Section */}
      <section className="wrapper py-8 border-t">
        <ProductTabs
          description={product.description}
          productId={product.id}
          productSlug={product.slug}
          userId={userId}
          product={{
            brand: product.brand,
            category: product.category,
            stock: product.stock,
            rating: product.rating,
            numReviews: product.numReviews,
          }}
        />
      </section>

      {/* Related Products */}
      <RelatedProducts productId={product.id} category={product.category} />
    </>
  );
};

export default ProductDetailsPage;
