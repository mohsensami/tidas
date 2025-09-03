"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { filters, products, sorts } from "@/lib/constants";

export default function CategoryPage() {
  const [selectedFilter, setSelectedFilter] = useState("همه");
  const [selectedSort, setSelectedSort] = useState("مرتب‌سازی پیش‌فرض");

  // Use useMemo to filter and sort products efficiently
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Apply filter
    if (selectedFilter !== "همه") {
      filtered = products.filter(
        (product) => product.category === selectedFilter
      );
    }

    // Apply sort
    const sorted = [...filtered].sort((a, b) => {
      if (selectedSort === "قیمت: کم به زیاد") {
        return a.price - b.price;
      }
      if (selectedSort === "قیمت: زیاد به کم") {
        return b.price - a.price;
      }
      return 0; // default sort
    });

    return sorted;
  }, [selectedFilter, selectedSort]);

  const formatPrice = (price: any) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " تومان";
  };

  return (
    <div className="bg-[#0b132b] text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#ffd700] mb-2">
            انگشترها
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            مجموعه‌ای بی‌نظیر از زیباترین انگشترهای طلا و جواهر، طراحی شده برای
            لحظات خاص شما.
          </p>
        </div>

        {/* Filters and Sorts Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 p-4 rounded-lg bg-[#141b3d] shadow-lg">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
            {filters.map((filter) => (
              <Button
                key={filter}
                variant="ghost"
                className={`text-sm py-2 px-4 rounded-full border border-transparent transition-colors duration-300 ease-in-out ${
                  selectedFilter === filter
                    ? "bg-[#ffd700] text-[#0b132b] font-semibold border-[#ffd700] hover:bg-yellow-400"
                    : "text-gray-300 hover:bg-[#1f284e] hover:text-[#ffd700] border-gray-600"
                }`}
                onClick={() => setSelectedFilter(filter)}
              >
                {filter}
              </Button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-sm hidden md:block">
              مرتب‌سازی بر اساس:
            </span>
            <DropdownMenu dir="rtl">
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="text-sm border-gray-600 bg-[#1f284e] text-gray-300 hover:bg-[#28325b] hover:text-[#ffd700] group"
                >
                  <span className="group-hover:text-[#ffd700] transition-colors duration-300">
                    {selectedSort}
                  </span>
                  <ChevronDown className="h-4 w-4 mr-2 group-hover:text-[#ffd700] transition-colors duration-300" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-[#1f284e] border-gray-600 text-white">
                <DropdownMenuRadioGroup
                  value={selectedSort}
                  onValueChange={setSelectedSort}
                >
                  {sorts.map((sort) => (
                    <DropdownMenuRadioItem
                      key={sort}
                      value={sort}
                      className="hover:bg-[#28325b] cursor-pointer text-gray-300 hover:text-[#ffd700]"
                    >
                      {sort}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredAndSortedProducts.map((product) => (
            <div
              key={product.id}
              className="group relative overflow-hidden rounded-xl shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl border border-gray-800 bg-[#1f284e]"
            >
              <div className="relative w-full h-64 overflow-hidden">
                <Image
                  src={`https://picsum.photos/400/300?random=${product.id}`}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-500 ease-in-out transform group-hover:scale-110"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-base md:text-lg font-semibold text-gray-200 group-hover:text-[#ffd700] transition-colors duration-300">
                  {product.name}
                </h3>
                <p className="mt-2 text-sm md:text-lg font-bold text-[#ffd700] transition-colors duration-300">
                  {formatPrice(product.price)}
                </p>
                <Button
                  variant="outline"
                  className="mt-4 w-full bg-[#ffd700] text-[#0b132b] font-semibold border-2 border-transparent hover:bg-yellow-400 hover:border-yellow-500 transition-all duration-300 ease-in-out transform hover:translate-y-[-2px] hover:shadow-lg"
                >
                  مشاهده محصول
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-12">
          <Pagination>
            <PaginationContent className="flex justify-center items-center gap-2">
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  className="text-gray-300 hover:text-[#ffd700] hover:bg-[#1f284e] transition-colors duration-300"
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  href="#"
                  className="bg-[#ffd700] text-[#0b132b] hover:bg-yellow-400 font-bold"
                  isActive
                >
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  href="#"
                  className="text-gray-300 hover:text-[#ffd700] hover:bg-[#1f284e] transition-colors duration-300"
                >
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  href="#"
                  className="text-gray-300 hover:text-[#ffd700] hover:bg-[#1f284e] transition-colors duration-300"
                >
                  3
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  href="#"
                  className="text-gray-300 hover:text-[#ffd700] hover:bg-[#1f284e] transition-colors duration-300"
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
