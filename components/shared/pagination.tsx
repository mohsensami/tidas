"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { formUrlQuery } from "@/lib/utils";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

type PaginationProps = {
  page: number | string;
  totalPages: number;
  urlParamName?: string;
};

const Pagination = ({ page, totalPages, urlParamName }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(page);

  // Handle Page Change
  const onClick = (pageValue: number) => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: urlParamName || "page",
      value: pageValue.toString(),
    });

    router.push(newUrl, { scroll: false });
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show pages around current page
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, currentPage + 2);

      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) {
          pages.push("...");
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pages.push("...");
        }
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      {/* Previous Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onClick(currentPage - 1)}
        disabled={currentPage <= 1}
        className="flex items-center gap-1"
      >
        <ChevronRight className="w-4 h-4" />
        قبلی
      </Button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {pageNumbers.map((pageNum, index) => (
          <div key={index}>
            {pageNum === "..." ? (
              <div className="px-3 py-2 text-gray-500">
                <MoreHorizontal className="w-4 h-4" />
              </div>
            ) : (
              <Button
                variant={currentPage === pageNum ? "default" : "outline"}
                size="sm"
                onClick={() => onClick(Number(pageNum))}
                className="w-10 h-10 p-0"
              >
                {pageNum}
              </Button>
            )}
          </div>
        ))}
      </div>

      {/* Next Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onClick(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="flex items-center gap-1"
      >
        بعدی
        <ChevronLeft className="w-4 h-4" />
      </Button>

      {/* Page Info */}
      <div className="mr-4 text-sm text-gray-600 dark:text-gray-400">
        صفحه {currentPage} از {totalPages}
      </div>
    </div>
  );
};

export default Pagination;
