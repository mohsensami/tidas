import Pagination from "@/components/shared/pagination";
import ProductCard from "@/components/shared/product/product-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getAllCategories,
  getAllProducts,
} from "@/lib/actions/product.actions";
import Link from "next/link";

const prices = [
  { name: "1 تا 50 تومان", value: "1-50" },
  { name: "51 تا 100 تومان", value: "51-100" },
  { name: "101 تا 200 تومان", value: "101-200" },
  { name: "201 تا 500 تومان", value: "201-500" },
  { name: "501 تا 1000 تومان", value: "501-1000" },
];
const ratings = [4, 3, 2, 1];
const sortOrders = [
  { key: "newest", label: "جدیدترین" },
  { key: "lowest", label: "کمترین قیمت" },
  { key: "highest", label: "بیشترین قیمت" },
  { key: "rating", label: "بیشترین امتیاز" },
];

export async function generateMetadata(props: {
  searchParams: Promise<{
    q: string;
    category: string;
    price: string;
    rating: string;
  }>;
}) {
  const {
    q = "all",
    category = "all",
    price = "all",
    rating = "all",
  } = await props.searchParams;

  const isQuerySet = q && q !== "all" && q.trim() !== "";
  const isCategorySet = category && category !== "all" && category.trim() !== "";
  const isPriceSet = price && price !== "all" && price.trim() !== "";
  const isRatingSet = rating && rating !== "all" && rating.trim() !== "";

  if (isQuerySet || isCategorySet || isPriceSet || isRatingSet) {
    return {
      title: `جستجو ${isQuerySet ? q : ""}${
        isCategorySet ? `: دسته بندی ${category}` : ""
      }${isPriceSet ? `: قیمت ${price}` : ""}${
        isRatingSet ? `: رتبه ${rating}` : ""
      }`,
    };
  } else {
    return { title: "جستجوی محصولات" };
  }
}

const SearchPage = async (props: {
  searchParams: Promise<{
    q?: string;
    category?: string;
    price?: string;
    rating?: string;
    sort?: string;
    page?: string;
  }>;
}) => {
  const {
    q = "all",
    category = "all",
    price = "all",
    rating = "all",
    sort = "newest",
    page = "1",
  } = await props.searchParams;

  const getFilterUrl = ({
    c,
    s,
    p,
    r,
    pg,
  }: {
    c?: string;
    s?: string;
    p?: string;
    r?: string;
    pg?: string;
  }) => {
    const params = { q, category, price, rating, sort, page };
    if (c) params.category = c;
    if (p) params.price = p;
    if (r) params.rating = r;
    if (pg) params.page = pg;
    if (s) params.sort = s;
    return `/search?${new URLSearchParams(params).toString()}`;
  };

  const products = await getAllProducts({
    query: q,
    category,
    price,
    rating,
    page: Number(page),
    sort,
  });
  const categories = await getAllCategories();

  return (
    <div className="wrapper grid md:grid-cols-5 gap-6">
      {/* فیلترها */}
      <aside className="space-y-6">
        {/* دسته‌بندی */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-bold">دسته‌بندی</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>
                <Link
                  className={`block rounded px-2 py-1 hover:bg-muted ${
                    ("all" === category || "" === category) &&
                    "font-semibold text-primary"
                  }`}
                  href={getFilterUrl({ c: "all" })}
                >
                  همه
                </Link>
              </li>
              {categories.map((x) => (
                <li key={x.category}>
                  <Link
                    className={`block rounded px-2 py-1 hover:bg-muted ${
                      x.category === category && "font-semibold text-primary"
                    }`}
                    href={getFilterUrl({ c: x.category })}
                  >
                    {x.category}
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* قیمت */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-bold">قیمت</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>
                <Link
                  className={`block rounded px-2 py-1 hover:bg-muted ${
                    "all" === price && "font-semibold text-primary"
                  }`}
                  href={getFilterUrl({ p: "all" })}
                >
                  همه
                </Link>
              </li>
              {prices.map((p) => (
                <li key={p.value}>
                  <Link
                    href={getFilterUrl({ p: p.value })}
                    className={`block rounded px-2 py-1 hover:bg-muted ${
                      p.value === price && "font-semibold text-primary"
                    }`}
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* امتیاز */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-bold">نظر کاربران</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>
                <Link
                  href={getFilterUrl({ r: "all" })}
                  className={`block rounded px-2 py-1 hover:bg-muted ${
                    "all" === rating && "font-semibold text-primary"
                  }`}
                >
                  همه
                </Link>
              </li>
              {ratings.map((r) => (
                <li key={r}>
                  <Link
                    href={getFilterUrl({ r: `${r}` })}
                    className={`block rounded px-2 py-1 hover:bg-muted ${
                      r.toString() === rating && "font-semibold text-primary"
                    }`}
                  >
                    {`${r} ستاره به بالا`}
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </aside>

      {/* نتایج */}
      <main className="md:col-span-4 space-y-6">
        {/* مرتب‌سازی */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">
            مرتب‌سازی بر اساس:
          </span>
          {sortOrders.map((s) => (
            <Link
              key={s.key}
              className={`rounded px-3 py-1 text-sm border transition hover:bg-muted ${
                sort === s.key ? "bg-primary text-white" : "bg-background"
              }`}
              href={getFilterUrl({ s: s.key })}
            >
              {s.label}
            </Link>
          ))}
        </div>

        {/* محصولات */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products!.data.length === 0 && (
            <div className="col-span-full text-center text-muted-foreground py-10">
              محصولی یافت نشد
            </div>
          )}
          {products!.data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* صفحه‌بندی */}
        {products!.totalPages! > 1 && (
          <div className="flex justify-center">
            <Pagination page={page} totalPages={products!.totalPages} />
          </div>
        )}
      </main>
    </div>
  );
};

export default SearchPage;
