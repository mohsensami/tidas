"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReviewList from "./review-list";
import { FileText, MessageSquare, Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ProductTabsProps {
  description: string;
  productId: string;
  productSlug: string;
  userId: string;
  product: {
    brand: string;
    category: string;
    stock: number;
    rating: string | number;
    numReviews: number;
  };
}

const ProductTabs = ({
  description,
  productId,
  productSlug,
  userId,
  product,
}: ProductTabsProps) => {
  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="description" className="gap-2">
          <FileText className="w-4 h-4" />
          <span>توضیحات</span>
        </TabsTrigger>
        <TabsTrigger value="reviews" className="gap-2">
          <MessageSquare className="w-4 h-4" />
          <span>دیدگاه‌ها ({product.numReviews})</span>
        </TabsTrigger>
        <TabsTrigger value="info" className="gap-2">
          <Info className="w-4 h-4" />
          <span>اطلاعات بیشتر</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="description" className="mt-6">
        <Card>
          <CardContent className="p-6">
            <div
              className="prose prose-sm max-w-none text-justify leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: description.replace(/\n/g, "<br />"),
              }}
            />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="reviews" className="mt-6">
        <ReviewList
          productId={productId}
          productSlug={productSlug}
          userId={userId}
        />
      </TabsContent>

      <TabsContent value="info" className="mt-6">
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm text-muted-foreground">
                    برند
                  </h3>
                  <p className="text-lg font-medium">{product.brand}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm text-muted-foreground">
                    دسته‌بندی
                  </h3>
                  <p className="text-lg font-medium">{product.category}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm text-muted-foreground">
                    موجودی
                  </h3>
                  <p className="text-lg font-medium">
                    {product.stock > 0 ? `${product.stock} عدد` : "موجود نیست"}
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm text-muted-foreground">
                    امتیاز
                  </h3>
                  <p className="text-lg font-medium">
                    {Number(product.rating).toFixed(1)} از 5.0
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default ProductTabs;
