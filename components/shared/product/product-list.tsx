"use client";

import { useRef } from "react";
import { Product } from "../../../types";
import ProductCard from "./product-card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
  const swiperRef = useRef<SwiperType | null>(null);

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">محصولی پیدا نشد!</p>
      </div>
    );
  }

  const displayData = limit ? data.slice(0, limit) : data;

  // برای loop باید حداقل 2 اسلاید داشته باشیم
  const shouldLoop = displayData.length > 1;

  return (
    <div className="relative w-full px-8 sm:px-12">
      {title && <h2 className="h4-bold mb-4">{title}</h2>}
      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={16}
          slidesPerView={1}
          loop={shouldLoop}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
            renderBullet: (index, className) => {
              return `<span class="${className}"></span>`;
            },
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 16,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
          }}
          className="!pb-12"
        >
          {displayData.map((product: Product) => (
            <SwiperSlide key={product.slug}>
              <div className="h-full">
                <ProductCard
                  product={product}
                  showFavoriteButton={showFavoriteButton}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons - خارج از کاروسل */}
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="absolute -left-8 sm:-left-12 top-1/2 -translate-y-1/2 z-10 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-background/95 backdrop-blur-sm border-2 border-border shadow-lg hover:bg-accent hover:scale-110 flex items-center justify-center transition-all duration-200 opacity-100"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="absolute -right-8 sm:-right-12 top-1/2 -translate-y-1/2 z-10 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-background/95 backdrop-blur-sm border-2 border-border shadow-lg hover:bg-accent hover:scale-110 flex items-center justify-center transition-all duration-200 opacity-100"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      <style jsx global>{`
        .swiper-pagination {
          bottom: 0 !important;
          position: absolute;
        }
        .swiper-pagination-bullet {
          background: hsl(var(--foreground)) !important;
          opacity: 0.3;
          width: 8px;
          height: 8px;
          transition: all 0.3s;
        }
        .swiper-pagination-bullet-active {
          opacity: 1 !important;
          width: 24px;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

export default ProductList;
