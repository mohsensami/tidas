import ProductList from "@/components/shared/product/product-list";
import sampleData from "../../../db/sample-data";

const HomePage = () => {
  return (
    <div className="space-y-8">
      <ProductList
        title="جدیدترین محصولات"
        data={sampleData.products}
        limit={4}
      />
    </div>
  );
};
export default HomePage;
