import { Product } from "../../../types";
import ProductCard from "./product-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
    // <div className="mt-2">
    //   <h2 className="h4-bold mb-4">{title}</h2>
    //   {data.length > 0 ? (
    //     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    //       {data.map((product: Product, index) => (
    //         <ProductCard
    //           key={product.slug}
    //           product={product}
    //           showFavoriteButton={showFavoriteButton}
    //         />
    //       ))}
    //     </div>
    //   )
    //    : (
    //     <div>
    //       <p>محصولی پیدا نشد!</p>
    //     </div>
    //   )}
    // </div>
    <>
      <Carousel
        opts={{
          align: "start",
          loop: true,
          // direction: "ltr",
        }}
        dir="ltr"
      >
        <CarouselContent>
          {data.map((product: Product, index) => (
            <CarouselItem className="md:basis-1/2 lg:basis-1/3" key={index}>
              <ProductCard
                key={product.slug}
                product={product}
                showFavoriteButton={showFavoriteButton}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
};

export default ProductList;
