import { Metadata } from "next";
import { requireAdmin } from "@/lib/auth-guard";
import ProductForm from "@/components/admin/product-form";

export const metadata: Metadata = {
  title: "افزودن محصول",
};

const CreateProductPage = async () => {
  await requireAdmin();
  return (
    <>
      <h2 className="h3-bold">افزودن محصول</h2>
      <div className="my-8">
        {/* Product Form Here */}
        <ProductForm type="Create" />
      </div>
    </>
  );
};
export default CreateProductPage;
