// Home.tsx
import StackedCards from "@/components/shared/StackedCards";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Gem, ShieldCheck, Award, Star } from "lucide-react";
import Image from "next/image";

const page = () => {
  return (
    <div className="bg-[#0a192f] text-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] flex items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-4 md:px-8">
          <div className="col-md-8">
            <div
              className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1611652033935-a5b6f39a2c3d?q=80&w=2940&auto=format&fit=crop')",
              }}
            >
              <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
            </div>
            <div className="relative z-10 p-4">
              <h1 className="text-2xl md:text-2xl font-bold text-[#d4af37] drop-shadow-lg">
                درخشش ابدی، زیبایی بی‌پایان
              </h1>
              <p className="mt-4 text-md md:text-md text-gray-200 max-w-2xl mx-auto">
                مجموعه‌ای بی‌نظیر از جواهرات دست‌ساز که هر لحظه شما را خاص
                می‌کند.
              </p>
              <Button className="mt-8 bg-[#d4af37] text-[#0a192f] hover:bg-[#c8a435] font-bold  px-8 py-6 rounded-lg">
                مشاهده کلکسیون
              </Button>
            </div>
          </div>
          <div className="col-md-4">
            <div dir="ltr" className="p-10 z-40 mt-12">
              <StackedCards
                items={[
                  {
                    img: "https://picsum.photos/id/4/400/400",
                    title: "جواهر شماره ۱",
                  },
                  {
                    img: "https://picsum.photos/id/6/400/400",
                    title: "جواهر شماره ۲",
                  },
                  {
                    img: "https://picsum.photos/id/8/400/400",
                    title: "جواهر شماره ۳",
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 px-4 md:px-8">
        <h2 className="text-3xl font-bold text-center text-[#d4af37] mb-12">
          دسته‌بندی‌های ویژه
        </h2>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {["انگشتر", "گردنبند", "دستبند"].map((category, index) => (
            <Card
              key={category}
              className="bg-[#172a45] border-2 border-[#d4af37]/50 rounded-lg overflow-hidden text-center transform hover:scale-105 transition-transform duration-300"
            >
              <CardHeader>
                <Image
                  width={400}
                  height={300}
                  src={`https://images.unsplash.com/photo-${
                    [
                      "1605103443339-a859a515f458",
                      "1610466000299-8a29e9234b34",
                      "1599343358761-a396269f58f4",
                    ][index]
                  }?q=80&w=800&auto=format&fit=crop`}
                  alt={category}
                  className="w-full h-64 object-cover"
                />
              </CardHeader>
              <CardContent>
                <CardTitle className="text-2xl font-semibold text-[#d4af37]">
                  {category}
                </CardTitle>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button
                  variant="outline"
                  className="border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-[#0a192f]"
                >
                  مشاهده همه
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-[#172a45] px-4 md:px-8">
        <h2 className="text-3xl font-bold text-center text-[#d4af37] mb-12">
          چرا ما را انتخاب کنید؟
        </h2>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="flex flex-col items-center">
            <Gem size={48} className="text-[#d4af37]" />
            <h3 className="text-xl font-bold mt-4 mb-2">کیفیت بی‌نظیر</h3>
            <p className="text-gray-400">
              استفاده از طلای ۱۸ عیار و سنگ‌های قیمتی با بالاترین کیفیت.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <ShieldCheck size={48} className="text-[#d4af37]" />
            <h3 className="text-xl font-bold mt-4 mb-2">ضمانت اصالت کالا</h3>
            <p className="text-gray-400">
              تمامی محصولات با شناسنامه و ضمانت‌نامه معتبر ارائه می‌شوند.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Award size={48} className="text-[#d4af37]" />
            <h3 className="text-xl font-bold mt-4 mb-2">طراحی منحصربه‌فرد</h3>
            <p className="text-gray-400">
              طراحی‌های مدرن و کلاسیک توسط بهترین طراحان جواهرات.
            </p>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-20 px-4 md:px-8">
        <h2 className="text-3xl font-bold text-center text-[#d4af37] mb-12">
          پرفروش‌ترین‌ها
        </h2>
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              name: "حلقه الماس رویال",
              price: "۳۵,۰۰۰,۰۰۰ تومان",
              img: "https://images.unsplash.com/photo-1598562354100-5e0f75cc5b06?q=80&w=800&auto=format&fit=crop",
            },
            {
              name: "گردنبند مروارید آتلانتیس",
              price: "۴۲,۰۰۰,۰۰۰ تومان",
              img: "https://images.unsplash.com/photo-1611591437134-4916a13d2d9b?q=80&w=800&auto=format&fit=crop",
            },
            {
              name: "دستبند طلایی ونوس",
              price: "۲۸,۵۰۰,۰۰۰ تومان",
              img: "https://images.unsplash.com/photo-1611591437123-2be26837a4a3?q=80&w=800&auto=format&fit=crop",
            },
            {
              name: "گوشواره یاقوت سرخ",
              price: "۵۵,۰۰۰,۰۰۰ تومان",
              img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop",
            },
          ].map((product) => (
            <Card
              key={product.name}
              className="bg-[#172a45] border border-gray-700 rounded-lg overflow-hidden group"
            >
              <CardHeader className="p-0">
                <Image
                  width={400}
                  height={300}
                  src={product.img}
                  alt={product.name}
                  className="w-full h-56 object-cover group-hover:opacity-80 transition-opacity"
                />
              </CardHeader>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-gray-200">
                  {product.name}
                </h3>
                <p className="text-[#d4af37] mt-2 font-bold">{product.price}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-[#172a45] px-4 md:px-8">
        <h2 className="text-3xl font-bold text-center text-[#d4af37] mb-12">
          آنچه مشتریان ما می‌گویند
        </h2>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-[#0a192f] border border-gray-700 p-6">
            <CardContent>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 italic">
                &quot;کیفیت کارها واقعا عالیه. از خریدم خیلی راضی هستم و حتما
                دوباره از شما خرید می‌کنم.&quot;
              </p>
              <p className="text-right mt-4 font-bold text-[#d4af37]">
                - سارا احمدی
              </p>
            </CardContent>
          </Card>
          <Card className="bg-[#0a192f] border border-gray-700 p-6">
            <CardContent>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 italic">
                &quot;طراحی‌ها بسیار خاص و زیبا هستند. بسته‌بندی هم خیلی شیک
                بود. ممنونم!&quot;
              </p>
              <p className="text-right mt-4 font-bold text-[#d4af37]">
                - علی رضایی
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 text-center bg-[#0a192f] px-4">
        <h2 className="text-2xl font-bold text-center text-[#d4af37]">
          به ما بپیوندید
        </h2>
        <p className="mt-4 mb-8 text-gray-300">
          برای دریافت آخرین اخبار و تخفیف‌های ویژه، در خبرنامه ما عضو شوید.
        </p>
        <div className="flex max-w-md mx-auto">
          <Input
            type="email"
            placeholder="ایمیل خود را وارد کنید"
            className="bg-gray-200 text-black border-0 rounded-l-none focus:ring-2 focus:ring-[#d4af37]"
          />
          <Button className="bg-[#d4af37] text-[#0a192f] hover:bg-[#c8a435] rounded-r-none">
            عضویت
          </Button>
        </div>
      </section>
    </div>
  );
};

export default page;
