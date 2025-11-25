"use client";

import Link from "next/link";
import { useEffect, useState, FormEvent } from "react";
import { Truck, AlarmClock, Headset, ShieldCheck, Phone } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
// import Input from "./Input";
// import Button from "./Button";

/* ===== Types (بدون any) ===== */
type Status = "draft" | "published";
interface PostRow {
  id: string;
  title: string;
  slug: string;
  status: Status;
}
interface ProductRow {
  id: string;
  name: string;
  slug: string;
}

/* ===== Footer ===== */
export default function Footer() {
  const [phone, setPhone] = useState<string>("");
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: ارسال شماره به API
    setPhone("");
  };

  // مقالات
  const [articles, setArticles] = useState<PostRow[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [err, setErr] = useState<string>("");

  // آخرین محصولات
  const [latestProducts, setLatestProducts] = useState<ProductRow[]>([]);
  const [pLoading, setPLoading] = useState<boolean>(false);
  const [pErr, setPErr] = useState<string>("");

  useEffect(() => {
    let isMounted = true;

    // async function fetchArticles() {
    //   setLoading(true);
    //   setErr("");
    //   try {
    //     const res = await fetch("/api/admin/posts/list", {
    //       credentials: "include",
    //     });
    //     const json: { ok?: true; rows?: PostRow[]; error?: string } =
    //       await res.json();
    //     if (!res.ok || !json.ok || !json.rows) {
    //       throw new Error(json.error || `HTTP ${res.status}`);
    //     }
    //     const latest = json.rows
    //       .filter((r) => r.status === "published")
    //       .slice(0, 4);
    //     if (isMounted) setArticles(latest);
    //   } catch (e) {
    //     if (isMounted)
    //       setErr(e instanceof Error ? e.message : "خطا در دریافت مقالات");
    //   } finally {
    //     if (isMounted) setLoading(false);
    //   }
    // }

    // async function fetchLatestProducts() {
    //   setPLoading(true);
    //   setPErr("");
    //   try {
    //     const res = await fetch("/api/admin/product/latest", {
    //       cache: "no-store",
    //     });
    //     const json: { ok?: true; rows?: ProductRow[]; error?: string } =
    //       await res.json();
    //     if (!res.ok || !json.ok || !json.rows) {
    //       throw new Error(json.error || `HTTP ${res.status}`);
    //     }
    //     if (isMounted) setLatestProducts(json.rows);
    //   } catch (e) {
    //     if (isMounted)
    //       setPErr(e instanceof Error ? e.message : "خطا در دریافت محصولات");
    //   } finally {
    //     if (isMounted) setPLoading(false);
    //   }
    // }

    // fetchArticles();
    // fetchLatestProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <footer dir="rtl" className="bg-dark-blue text-white">
      {/* بخش تماس */}
      <div className="bg-dark-blue text-gold py-6">
        <div className="wrapper">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-right">
              <h3 className="font-bold text-lg mb-2">با ما تماس بگیرید</h3>
              <p className="text-yellow-400 text-xl font-bold">021-xxxxxxxx</p>
              <p className="text-sm text-gray-400 mt-1">
                تماس مستقیم با مدیریت
              </p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-300">tidasgoldgallery@gmail.com</p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-300">مشاوره فروش</p>
              <p className="text-gray-300">در وب اپلیکیشن تماس</p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-300 font-semibold">موقعیت</p>
              <p className="text-gray-300 text-sm">خیابان پیروزی</p>
            </div>
          </div>
        </div>
      </div>

      {/* لینک‌های دسته‌بندی و اطلاعات */}
      <div className="wrapper py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* دسته‌بندی‌ها */}
          <div>
            <h4 className="font-bold text-lg mb-4">دسته‌بندی‌ها</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link
                  href="/search?category=سرویس"
                  className="hover:text-yellow-400"
                >
                  سرویس
                </Link>
              </li>
              <li>
                <Link
                  href="/search?category=نیم ست"
                  className="hover:text-yellow-400"
                >
                  نیم ست
                </Link>
              </li>
              <li>
                <Link
                  href="/search?category=گردنبند"
                  className="hover:text-yellow-400"
                >
                  گردنبند
                </Link>
              </li>
              <li>
                <Link
                  href="/search?category=زنجیر"
                  className="hover:text-yellow-400"
                >
                  زنجیر
                </Link>
              </li>
              <li>
                <Link
                  href="/search?category=دستبند"
                  className="hover:text-yellow-400"
                >
                  دستبند
                </Link>
              </li>
              <li>
                <Link
                  href="/search?category=انگشتر"
                  className="hover:text-yellow-400"
                >
                  انگشتر
                </Link>
              </li>
              <li>
                <Link
                  href="/search?category=گوشواره"
                  className="hover:text-yellow-400"
                >
                  گوشواره
                </Link>
              </li>
            </ul>
          </div>

          {/* اطلاعات فروشگاه */}
          {/* <div>
            <h4 className="font-bold text-lg mb-4">اطلاعات فروشگاه</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/faq" className="hover:text-yellow-400">
                  قوانین و مقررات
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-yellow-400">
                  تماس با ما
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="hover:text-yellow-400">
                  همکاری با ما
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-yellow-400">
                  بلاگ آموزشی
                </Link>
              </li>
            </ul>
          </div> */}

          {/* اطلاعات تماس */}
          <div>
            <h4 className="font-bold text-lg mb-4">اطلاعات تماس</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>شعبه جنوب: .....................</li>
              <li>شعبه غرب: .............</li>
              <li>
                <Link href="#" className="hover:text-yellow-400">
                  اینستاگرام ما
                </Link>
              </li>
              <li>021-xxxxxxxx</li>
            </ul>
          </div>
        </div>

        {/* نمادهای اعتماد */}
        <div className="mt-8 pt-8 border-t border-gray-700">
          <h4 className="font-bold text-lg mb-4 text-center">نمادهای اعتماد</h4>
          <p className="text-center text-sm text-gray-400">
            به زودی: خرید اقساطی با اسنپ پی
          </p>
        </div>

        {/* کپی‌رایت */}
        <div className="mt-8 pt-6 border-t border-gray-700 text-center">
          <p className="text-sm text-gray-400">
            تمامی حقوق این سایت متعلق به طلا فروشی تیداس گلد گالری می باشد.
          </p>
          <p className="text-sm text-gray-400 mt-2">
            تجربه یک خرید مطمئن با تیداس گلد!
          </p>
        </div>
      </div>
    </footer>
  );
}
