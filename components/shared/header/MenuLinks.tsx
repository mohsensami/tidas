"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { formatCurrency } from "@/lib/utils";

// دسته‌بندی‌های استاتیک
const categories = [
  { category: "النگو", count: 12 },
  { category: "آویز", count: 8 },
  { category: "انگشتر", count: 15 },
];

// محصولات استاتیک برای هر دسته‌بندی
const staticProducts: Record<
  string,
  Array<{
    id: string;
    name: string;
    slug: string;
    image: string;
    price: number;
    stock: number;
  }>
> = {
  النگو: [
    {
      id: "1",
      name: "النگو طلا طرح کلاسیک",
      slug: "alangoo-tala-classic",
      image: "/images/sample-products/p1-1.jpg",
      price: 5000000,
      stock: 10,
    },
    {
      id: "2",
      name: "النگو نقره با نگین",
      slug: "alangoo-noqre-ngin",
      image: "/images/sample-products/p2-1.jpg",
      price: 3000000,
      stock: 5,
    },
    {
      id: "3",
      name: "النگو طلا ساده",
      slug: "alangoo-tala-sade",
      image: "/images/sample-products/p3-1.jpg",
      price: 4500000,
      stock: 8,
    },
    {
      id: "4",
      name: "النگو طلا طرح مدرن",
      slug: "alangoo-tala-modern",
      image: "/images/sample-products/p4-1.jpg",
      price: 5500000,
      stock: 12,
    },
    {
      id: "5",
      name: "النگو طلا با الماس",
      slug: "alangoo-tala-diamond",
      image: "/images/sample-products/p5-1.jpg",
      price: 8000000,
      stock: 3,
    },
    {
      id: "6",
      name: "النگو نقره دست‌ساز",
      slug: "alangoo-noqre-handmade",
      image: "/images/sample-products/p6-1.jpg",
      price: 2500000,
      stock: 15,
    },
  ],
  آویز: [
    {
      id: "7",
      name: "آویز طلا قلب",
      slug: "aviz-tala-heart",
      image: "/images/sample-products/p1-1.jpg",
      price: 3500000,
      stock: 10,
    },
    {
      id: "8",
      name: "آویز نقره ستاره",
      slug: "aviz-noqre-star",
      image: "/images/sample-products/p2-1.jpg",
      price: 2000000,
      stock: 7,
    },
    {
      id: "9",
      name: "آویز طلا گل",
      slug: "aviz-tala-flower",
      image: "/images/sample-products/p3-1.jpg",
      price: 4000000,
      stock: 5,
    },
    {
      id: "10",
      name: "آویز طلا با نگین",
      slug: "aviz-tala-ngin",
      image: "/images/sample-products/p4-1.jpg",
      price: 4500000,
      stock: 8,
    },
    {
      id: "11",
      name: "آویز نقره ماه",
      slug: "aviz-noqre-moon",
      image: "/images/sample-products/p5-1.jpg",
      price: 1800000,
      stock: 12,
    },
    {
      id: "12",
      name: "آویز طلا الماس",
      slug: "aviz-tala-diamond",
      image: "/images/sample-products/p6-1.jpg",
      price: 6000000,
      stock: 4,
    },
  ],
  انگشتر: [
    {
      id: "13",
      name: "انگشتر طلا ساده",
      slug: "angoshtar-tala-sade",
      image: "/images/sample-products/p1-1.jpg",
      price: 6000000,
      stock: 10,
    },
    {
      id: "14",
      name: "انگشتر نقره با نگین",
      slug: "angoshtar-noqre-ngin",
      image: "/images/sample-products/p2-1.jpg",
      price: 3500000,
      stock: 8,
    },
    {
      id: "15",
      name: "انگشتر طلا الماس",
      slug: "angoshtar-tala-diamond",
      image: "/images/sample-products/p3-1.jpg",
      price: 12000000,
      stock: 3,
    },
    {
      id: "16",
      name: "انگشتر طلا طرح کلاسیک",
      slug: "angoshtar-tala-classic",
      image: "/images/sample-products/p4-1.jpg",
      price: 7000000,
      stock: 6,
    },
    {
      id: "17",
      name: "انگشتر نقره ساده",
      slug: "angoshtar-noqre-sade",
      image: "/images/sample-products/p5-1.jpg",
      price: 2800000,
      stock: 15,
    },
    {
      id: "18",
      name: "انگشتر طلا مدرن",
      slug: "angoshtar-tala-modern",
      image: "/images/sample-products/p6-1.jpg",
      price: 6500000,
      stock: 9,
    },
  ],
};

export function MenuLinks() {
  const isMobile = useIsMobile();
  const [hoveredCategory, setHoveredCategory] = React.useState<string | null>(
    null
  );

  const products = hoveredCategory ? staticProducts[hoveredCategory] || [] : [];

  return (
    <NavigationMenu className="hidden md:block" viewport={isMobile}>
      <NavigationMenuList className="flex-wrap justify-end">
        {/* محصولات */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>محصولات</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-4 p-6 md:w-[700px] lg:w-[900px] lg:grid-cols-[250px_1fr]">
              {/* لیست دسته‌بندی‌ها */}
              <div className="space-y-1 border-l lg:pr-4">
                {categories.map((cat) => (
                  <Link
                    key={cat.category}
                    href={`/search?category=${encodeURIComponent(cat.category)}`}
                    onMouseEnter={() => setHoveredCategory(cat.category)}
                    className={`block rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground ${
                      hoveredCategory === cat.category
                        ? "bg-accent font-medium"
                        : ""
                    }`}
                  >
                    <div className="font-medium">{cat.category}</div>
                    <div className="text-xs text-muted-foreground">
                      {cat.count} محصول
                    </div>
                  </Link>
                ))}
              </div>

              {/* نمایش محصولات */}
              <div className="lg:pl-4">
                {hoveredCategory ? (
                  <div>
                    <h3 className="mb-4 text-lg font-semibold">
                      محصولات {hoveredCategory}
                    </h3>
                    {products.length > 0 ? (
                      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
                        {products.map((product) => (
                          <Link
                            key={product.id}
                            href={`/product/${product.slug}`}
                            className="group space-y-2 rounded-lg border p-3 transition-colors hover:bg-accent"
                          >
                            <div className="relative aspect-square overflow-hidden rounded-md bg-muted">
                              <Image
                                src={product.image || "/images/logo.jpg"}
                                alt={product.name}
                                fill
                                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                                className="object-cover transition-transform group-hover:scale-105"
                              />
                            </div>
                            <div className="space-y-1">
                              <h4 className="line-clamp-2 text-sm font-medium">
                                {product.name}
                              </h4>
                              <div className="text-sm font-semibold text-primary">
                                {formatCurrency(product.price.toFixed(0))} تومان
                              </div>
                              {product.stock === 0 && (
                                <div className="text-xs text-destructive">
                                  موجود نیست
                                </div>
                              )}
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="py-8 text-center text-sm text-muted-foreground">
                        محصولی در این دسته‌بندی یافت نشد
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex h-full items-center justify-center py-8">
                    <p className="text-sm text-muted-foreground">
                      روی یک دسته‌بندی هاور کنید تا محصولات را ببینید
                    </p>
                  </div>
                )}
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* صفحه نخست */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/">صفحه نخست</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
