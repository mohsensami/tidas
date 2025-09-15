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

const HomePage = async () => {
  const latestProducts: any = await getLatestProducts();
  const featuredProducts = await getFeaturedProducts();
  return (
    <div className="space-y-8">
      {featuredProducts.length > 0 && (
        <ProductCarousel data={featuredProducts} />
      )}

      <ProductList title="جدیدترین محصولات" data={latestProducts} />
      <ViewAllProductsButton />
      <DealCountdown />
      <IconBoxes />
    </div>
  );
};
export default HomePage;
