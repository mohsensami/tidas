import { getRelatedProducts } from "@/lib/actions/product.actions";
import ProductCard from "@/components/shared/product/product-card";
import { Product } from "@/types";

interface RelatedProductsProps {
  productId: string;
  category: string;
}

const RelatedProducts = async ({
  productId,
  category,
}: RelatedProductsProps) => {
  const relatedProducts = await getRelatedProducts(productId, category, 4);

  if (!relatedProducts || relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="wrapper py-10">
      <h2 className="text-2xl font-bold mb-6">محصولات مرتبط</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;

