"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Badge } from "../ui/badge";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Filter, X, ChevronDown, Star, SlidersHorizontal } from "lucide-react";
import Link from "next/link";

interface MobileFilterDrawerProps {
  categories: Array<{ category: string }>;
  prices: Array<{ name: string; value: string }>;
  ratings: number[];
  getFilterUrl: (params: any) => string;
  category: string;
  price: string;
  rating: string;
}

const MobileFilterDrawer = ({
  categories,
  prices,
  ratings,
  getFilterUrl,
  category,
  price,
  rating,
}: MobileFilterDrawerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const activeFiltersCount = [
    category !== "all",
    price !== "all",
    rating !== "all",
  ].filter(Boolean).length;

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="lg:hidden flex items-center gap-2">
          <Filter className="w-4 h-4" />
          فیلترها
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-1">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[80vh]">
        <DrawerHeader className="border-b">
          <div className="flex items-center justify-between">
            <DrawerTitle className="flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5" />
              فیلترها
            </DrawerTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Categories */}
          <div>
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <ChevronDown className="w-4 h-4" />
              دسته‌بندی‌ها
            </h4>
            <div className="space-y-2">
              <Link
                href={getFilterUrl({ c: "all" })}
                className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                  "all" === category || "" === category
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
                onClick={() => setIsOpen(false)}
              >
                همه دسته‌ها
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.category}
                  href={getFilterUrl({ c: cat.category })}
                  className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                    cat.category === category
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {cat.category}
                </Link>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <ChevronDown className="w-4 h-4" />
              محدوده قیمت
            </h4>
            <div className="space-y-2">
              <Link
                href={getFilterUrl({ p: "all" })}
                className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                  "all" === price
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
                onClick={() => setIsOpen(false)}
              >
                همه قیمت‌ها
              </Link>
              {prices.map((priceRange) => (
                <Link
                  key={priceRange.value}
                  href={getFilterUrl({ p: priceRange.value })}
                  className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                    priceRange.value === price
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {priceRange.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div>
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <ChevronDown className="w-4 h-4" />
              امتیاز کاربران
            </h4>
            <div className="space-y-2">
              <Link
                href={getFilterUrl({ r: "all" })}
                className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                  "all" === rating
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
                onClick={() => setIsOpen(false)}
              >
                همه امتیازها
              </Link>
              {ratings.map((ratingValue) => (
                <Link
                  key={ratingValue}
                  href={getFilterUrl({ r: `${ratingValue}` })}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                    ratingValue.toString() === rating
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < ratingValue
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span>{ratingValue} ستاره به بالا</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t p-4 space-y-3">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              window.location.href = "/search";
              setIsOpen(false);
            }}
          >
            <X className="w-4 h-4 ml-2" />
            پاک کردن فیلترها
          </Button>
          <Button className="w-full" onClick={() => setIsOpen(false)}>
            اعمال فیلترها
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileFilterDrawer;
