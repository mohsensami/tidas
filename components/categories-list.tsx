import Link from "next/link";
import { getAllCategories } from "@/lib/actions/product.actions";
import Image from "next/image";

const CategoriesList = async () => {
  const categories = await getAllCategories();

  const catNames: any = {
    النگو: "alangoo",
    آویز: "aviz",
    انگشتر: "angoshtar",
  };

  return (
    <div className="">
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-center">دسته‌بندی‌های محصولات</h2>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {categories.map((category) => (
            <Link
              key={category.category}
              href={`/search?category=${encodeURIComponent(category.category)}`}
              className="px-6 py-3 bg-muted hover:bg-muted/80 rounded-lg transition-colors text-center min-w-[120px]"
            >
              <div>
                <Image
                  src={`/images/categories/${catNames[category.category]}.png`}
                  alt={category.category}
                  width={100}
                  height={100}
                />
              </div>
              <div className="font-semibold">{category.category}</div>
              <div className="text-sm text-muted-foreground">
                {category._count} محصول
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesList;
