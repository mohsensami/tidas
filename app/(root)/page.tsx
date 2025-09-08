import ProductList from "../../components/shared/product/product-list";
import sampleData from "../../db/sample-data";
import { getLatestProducts } from "../../lib/actions/product.actions";

const HomePage = async () => {
  const latestProducts: any = await getLatestProducts();
  return (
    <div className="space-y-8">
      <ProductList title="جدیدترین محصولات" data={latestProducts} limit={4} />
    </div>
  );
};
export default HomePage;
