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
import PromotionalHero from "@/components/promotional-hero";
import WhyUs from "@/components/WhyUs";
import { MainDialog } from "@/components/main-dialog";
import CategoriesList from "@/components/categories-list";
import TwoColumns from "@/components/TwoColumns";
import FAQ from "@/components/faq";
import SpecialProductSections from "@/components/special-product-sections";
import GuaranteeSection from "@/components/guarantee-section";

const HomePage = async () => {
  const latestProducts: any = await getLatestProducts();
  // const featuredProducts = await getFeaturedProducts();
  return (
    <div className="space-y-0">
      {/* Hero Section با بنرهای تبلیغاتی */}
      <PromotionalHero />

      {/* بخش محصولات ویژه */}
      <SpecialProductSections />

      {/* دسته‌بندی‌ها */}
      <div className="wrapper text-gold py-8">
        <CategoriesList />
      </div>

      {/* جدیدترین محصولات */}
      <div className="wrapper  py-8">
        <ProductList title="جدیدترین ها (مشاهده همه)" data={latestProducts} />
        <ViewAllProductsButton />
      </div>

      {/* بخش تضمین‌ها */}
      <GuaranteeSection />

      {/* بخش دو ستونی */}
      {/* <div className="wrapper py-8">
        <TwoColumns />
      </div> */}

      {/* FAQ */}
      {/* <FAQ /> */}
    </div>
  );
};
export default HomePage;
