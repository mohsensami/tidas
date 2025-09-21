import { Card, CardContent, CardHeader } from "../../ui/card";

const ProductCardSkeleton = () => {
  return (
    <Card className="w-full max-w-sm animate-pulse">
      <CardHeader className="p-0">
        <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
      </CardHeader>
      <CardContent className="p-4 space-y-3">
        {/* Category */}
        <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>

        {/* Product Name */}
        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded"
              ></div>
            ))}
          </div>
          <div className="h-3 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>

        {/* Price */}
        <div className="h-5 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>

        {/* Features */}
        <div className="flex items-center gap-4">
          <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-3 w-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>

        {/* Stock Status */}
        <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </CardContent>
    </Card>
  );
};

export default ProductCardSkeleton;
