import { ProductCarousel } from "@/components/shared/product/product-carousel";
import ProductList from "../../components/shared/product/product-list";
import sampleData from "../../db/sample-data";
import {
  getFeaturedProducts,
  getLatestProducts,
} from "../../lib/actions/product.actions";
import ViewAllProductsButton from "@/components/view-all-products-button";
import IconBoxes from "@/components/icon-boxes";
import DealCountdown from "@/components/deal-countdown";
import Hero from "@/components/hero";
import WhyUs from "@/components/WhyUs";
import { MainDialog } from "@/components/main-dialog";
// import Hero2 from "@/components/hero2";

const HomePage = async () => {
  const latestProducts: any = await getLatestProducts();
  const featuredProducts = await getFeaturedProducts();
  return (
    <div className="space-y-8">
      {/* <div dir="ltr">
        {featuredProducts.length > 0 && (
          <ProductCarousel data={featuredProducts} />
        )}
      </div> */}

      <Hero />
      {/* <Hero2 /> */}

      <div className="wrapper">
        <ProductList title="جدیدترین محصولات" data={latestProducts} />
        <ViewAllProductsButton />
      </div>
      <WhyUs />
      <div className="wrapper">
        <DealCountdown targetDate={new Date("2026-12-20T00:00:00")} />
        {/* <IconBoxes /> */}
      </div>
      <MainDialog />
    </div>
  );
};
export default HomePage;
