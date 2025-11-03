import { Product } from "../../../types";
import ProductCard from "./product-card";

const ProductList = ({
  data,
  title,
  limit,
  showFavoriteButton = false,
}: {
  data: Product[];
  title?: string;
  limit?: number;
  showFavoriteButton?: boolean;
}) => {
  // Apply limit if provided, otherwise show all products
  // const limitedData = limit ? data.slice(0, limit) : data;

  return (
    <div className="my-2">
      <h2 className="h4-bold mb-4">{title}</h2>
      {data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.map((product: Product, index) => (
            <ProductCard
              key={product.slug}
              product={product}
              showFavoriteButton={showFavoriteButton}
            />
          ))}
        </div>
      ) : (
        <div>
          <p>محصولی پیدا نشد!</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
